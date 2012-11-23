var Scene = (function () {
    var scene, renderer;

    var vehicle, camera, keyboard;
    
    var currentTime = new Date().getTime();

    var initScene = function init() {

        scene = new THREE.Scene();

        _.each(Level.tiles, function(tile) {
            var t = tile;
            scene.add(t.mesh);
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

        // _.each(tilesCache, function (tile) {
        //     scene.remove(tile.mesh);
        //     renderer.deallocateObject(tile.mesh);
        // });

        _.each(Level.tiles, function(tile) {
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
        updateScene: updateScene
    };

})();