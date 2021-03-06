var Scene = (function () {
    var scene, renderer;

    var vehicle, camera, keyboard, light, explosion;
    
    var currentTime = new Date().getTime();
    var SkyRoadsCopy = utils.deepCopy(SkyRoads);

    var initScene = function init() {

        scene = new THREE.Scene();

        _.each(Level.getTiles(), function(tile) {
            var t = tile;
            scene.add(t.mesh);
        });
        
        keyboard = new Keyboard();
        vehicle = new Vehicle(scene);

        camera = new Camera();
        
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);

        //
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, -1).normalize();
        scene.add(directionalLight);

        explosion = new Explosion(scene);

        renderer = new THREE.WebGLRenderer();
        //renderer = new THREE.CanvasRenderer();
        renderer.setSize( $('#gameWindow').width(), $('#gameWindow').height() );

        $('#gameWindow').append( renderer.domElement );
    };

    function updateSize() {
        renderer.setSize( $('#gameWindow').width(), $('#gameWindow').height() );
    }

    function updateScene() {

        var obj, i;
        for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
            obj = scene.children[ i ];
            if (obj._isTile) {
                scene.remove(obj);
            }
        }

        _.each(Level.getTiles(), function(tile) {
            var t = tile;
            scene.add(t.mesh);
        });
        renderer.render(scene, camera.mesh);

    }

    function updateDelta() {
        var newTime = new Date().getTime();
        SkyRoads.delta = (newTime - currentTime) / 1000;
        if (SkyRoads.delta === 0 || SkyRoads.delta > 1000) {
            SkyRoads.delta = 1 / 60;
        }
        currentTime = newTime;
    }

    function placeVehicleAtStartPosition() {
        // When we find the start tile, place the vehicle on it at the beginning
        var startTile = Level.getStartTile();
        if (startTile) {
            console.log("Found starting tile", startTile);
            SkyRoads.vehicle.position.x = startTile.cell.x * SkyRoads.cell.size.x - (Math.floor(SkyRoads.cell.maxGrid.x / 2) * SkyRoads.cell.size.x);
            SkyRoads.vehicle.position.z = - startTile.cell.z * SkyRoads.cell.size.x;
            SkyRoads.vehicle.position.y = vehicle.getMinHeight();
        }
        vehicle.move();
        vehicle.spawn();
    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        updateDelta();

        SkyRoads.time += SkyRoads.delta;
        if (SkyRoads.restart) {
            Level.restart();
            placeVehicleAtStartPosition();
            explosion.stop();
        } else if (SkyRoads.time > 1 && !SkyRoads.vehicle.dead && !SkyRoads.vehicle.winning) {
            keyboard.update();
            vehicle.update();
            camera.update();
        } else if (SkyRoads.vehicle.dead) {
            vehicle.update();
            explosion.update();
            camera.update();
        } else if (SkyRoads.vehicle.winning) {
            vehicle.update();
            camera.update();
        }
        renderer.render(scene, camera.mesh);
    }

    function getActiveTile()
    {
        if (!vehicle)
            return null;
        return vehicle.getActiveTile();
    }

    function killVehicle() {
        if (!SkyRoads.vehicle.dead) {
            $("#death-screen").show();
            SkyRoads.vehicle.dead = true;
            vehicle.destroy();
            explosion.start();
        }
    }

    function winLevel() {
        if (!SkyRoads.vehicle.winning) {
            // We reached the end of the level without dying!
            $('#winning-screen').show();
            SkyRoads.vehicle.winning = true;
        }
    }

    $(function() {
        initScene();
        animate();
    });

    return {
        getActiveTile : getActiveTile,
        updateScene: updateScene,
        winLevel: winLevel,
        killVehicle: killVehicle,
        SkyRoadsCopy: SkyRoadsCopy,
        updateSize : updateSize
    };

})();