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
        vehicle = new Vehicle();
        scene.add(vehicle.mesh);

        camera = new Camera();
        
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);

        //
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, -1).normalize();
        scene.add(directionalLight);

        renderer = new THREE.WebGLRenderer();
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
        });
        renderer.render(scene, camera.mesh);
    }

    var animate = function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        var newTime = new Date().getTime();
        SkyRoads.delta = (newTime - currentTime) / 1000;
        if (SkyRoadsCopy.delta > 0.05)
            console.log(SkyRoads.delta);
        currentTime = newTime;

        SkyRoads.time += SkyRoads.delta;
        if (SkyRoads.time > 2 && !SkyRoads.vehicle.dead) {
            keyboard.update();
            camera.update();
            vehicle.update();
        } else if (SkyRoads.vehicle.dead) {
            $("#death-screen").show();
        }
        renderer.render(scene, camera.mesh);
    };

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