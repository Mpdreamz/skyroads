var Scene = (function () {
    var scene, renderer;

    var vehicle, camera, keyboard;
    
    var currentTime = new Date().getTime();

    var initScene = function init() {

        scene = new THREE.Scene();

        $.each(Level.tiles, function(i, tile) {
            scene.add(tile.mesh);
        });
        
        // for (var depth =0; depth < 1000; depth++)
        // {
        //     var cellWidth = 200;
        //     for (var column = 0; column < 7; column++)
        //     {
        //         tile = new Tile(column * cellWidth - 3 * cellWidth, 0, depth * cellWidth);
        //         scene.add(tile.mesh);
        //     }
        // }

        keyboard = new Keyboard();
        vehicle = new Vehicle();
        scene.add(vehicle.mesh);

        camera = new Camera();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );
    };


    var animate = function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        var newTime = new Date().getTime();
        SkyRoads.delta = (newTime - currentTime) / 1000;
        currentTime = newTime;

        SkyRoads.time += SkyRoads.delta;

        keyboard.update();
        camera.update();
        vehicle.update();

        renderer.render(scene, camera.mesh);
    };

    $(function() {
        initScene();
        animate();
    });

    return {
        
    };

})();

















