var Scene = (function () {
    var scene, renderer;

    var vehicle, camera, keyboard, light;
    
    var currentTime = new Date().getTime();
    var SkyRoadsCopy = utils.deepCopy(SkyRoads);
    console.log(SkyRoadsCopy);

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

        //renderer = new THREE.WebGLRenderer();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( $('#gameWindow').width(), $('#gameWindow').height() );

        $('#gameWindow').append( renderer.domElement );
    };

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

            // When we find the start tile, place the vehicle on it at the beginning
            if (t.cell.type == "start") {
                console.log("Found starting tile", tile);
                // SkyRoads.vehicle.position.x = t.cell.x * SkyRoads.cell.size.x - (Math.floor(SkyRoads.cell.maxGrid.x / 2) * SkyRoads.cell.size.x);
                // SkyRoads.vehicle.position.y = t.cell.h + (SkyRoads.vehicle.size.y / 2) + 1;
                // SkyRoads.vehicle.position.z = - t.cell.z * SkyRoads.cell.size.x; // Because there is no cell.size.z.
                
                // vehicle.mesh.position.x = t.cell.x * SkyRoads.cell.size.x - (Math.floor(SkyRoads.cell.maxGrid.x / 2) * SkyRoads.cell.size.x);
                // vehicle.mesh.position.y = t.cell.h + (SkyRoads.vehicle.size.y / 2) + 1;
                // vehicle.mesh.position.z = - t.cell.z * SkyRoads.cell.size.x; // Because there is no cell.size.z.
            }
        });
        renderer.render(scene, camera.mesh);

    }

    function updateDelta() {
        var newTime = new Date().getTime();
        SkyRoads.delta = (newTime - currentTime) / 1000;
        if (SkyRoads.delta === 0 || SkyRoads.delta > 1000)
            SkyRoads.delta = 1 / 60;
        currentTime = newTime;
    }

    function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        updateDelta();

        SkyRoads.time += SkyRoads.delta;
        if (SkyRoads.restart) {
            Level.restart();
            vehicle.move();
        } else if (SkyRoads.time > 1 && !SkyRoads.vehicle.dead && !SkyRoads.vehicle.winning) {
            keyboard.update();
            camera.update();
            vehicle.update();
        } else if (SkyRoads.vehicle.dead) {
            $("#death-screen").show();
        }
        else if (SkyRoads.vehicle.winning) {
            $('#winning-screen').show();
        }
        renderer.render(scene, camera.mesh);
    }

    function getActiveTile()
    {
        if (!vehicle)
            return null;
        return Level.getTileAt(vehicle.mesh.position.x, vehicle.mesh.position.z);
    }

    $(function() {
        initScene();
        animate();

    });

    return {
        getActiveTile : getActiveTile,
        updateScene: updateScene,
        SkyRoadsCopy: SkyRoadsCopy
    };

})();