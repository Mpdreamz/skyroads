var Scene = (function () {
    var scene, renderer;

    var vehicle, camera, keyboard;
    
    var currentTime = new Date().getTime();

    var initScene = function init() {

        scene = new THREE.Scene();

        for (var depth =0; depth < 1000; depth++)
        {
            var cellWidth = 200;
            for (var column = 0; column < 7; column++)
            {
                tile = new Tile(column * cellWidth - 3 * cellWidth, 0, depth * cellWidth);
                scene.add(tile.mesh);
            }
        }

        keyboard = new Keyboard();
        vehicle = new Vehicle();
        scene.add(vehicle.mesh);

        camera = new Camera();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );
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
    }

    $(function() {
        initScene();
        animate();
    });

    return { 
        
    }

})();


var Tile = (function (x, y, z) {
    var mesh;

    function init () {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( g, m );
        
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;

        update();
    }

    function update() {
        mesh.scale.x = SkyRoads.cell.size.x;
        mesh.scale.y = SkyRoads.cell.size.y;
        mesh.scale.z = SkyRoads.cell.size.x;
    }

    init();

    return {
        mesh: mesh,
        update: update
    }
})

var Camera = (function () {
    var mesh, target;

    var init = function() {
        mesh = new THREE.PerspectiveCamera( SkyRoads.camera.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        target = new GhostCameraTarget();
        mesh.lookAt(target.mesh.position);

        update();
    }

    var update = function() {
        SkyRoads.camera.position.x = SkyRoads.camera.offsetPosition.x;
        SkyRoads.camera.position.y = SkyRoads.vehicle.position.y + SkyRoads.camera.offsetPosition.y;
        SkyRoads.camera.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.offsetPosition.z;

        mesh.position.x = SkyRoads.camera.position.x;
        mesh.position.y = SkyRoads.camera.position.y;
        mesh.position.z = SkyRoads.camera.position.z;

        target.update();
    }

    init();

    return {
        mesh: mesh,
        update: update
    }
});

var GhostCameraTarget = (function () {
    var mesh;

    var init = function () {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { } );
        mesh =  new THREE.Mesh( g, m );
        update();
    }

    var update = function (){
        //mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.targetOffset;
    }

    init();

    return {
        update: update,
        mesh: mesh
    }
});


var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        mesh =  new THREE.Mesh( g, m );
        update();
    }

    var update = function () {
        SkyRoads.vehicle.position.z += SkyRoads.vehicle.velocity;

        mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z;

        mesh.scale.x = SkyRoads.vehicle.size.x;
        mesh.scale.y = SkyRoads.vehicle.size.y;
        mesh.scale.z = SkyRoads.vehicle.size.z;
    }

    init();

    return {
        update: update,
        mesh: mesh
    }

});







