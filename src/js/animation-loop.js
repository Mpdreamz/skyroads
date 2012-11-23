var Scene = (function () {
    var camera, scene, renderer;

    var vehicle, ghostCameraTarget;
    
    var currentTime = new Date().getTime();

    var initScene = function init() {

        camera = new THREE.PerspectiveCamera( SkyRoads.camera.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

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

        vehicle = new Vehicle();
        scene.add(vehicle.mesh);

        ghostCameraTarget = new GhostCameraTarget();
        //scene.add(ghostCameraTarget.mesh);

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

        SkyRoads.camera.position.x = SkyRoads.vehicle.position.x + SkyRoads.camera.offsetPosition.x;
        SkyRoads.camera.position.y = SkyRoads.vehicle.position.y + SkyRoads.camera.offsetPosition.y;
        SkyRoads.camera.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.offsetPosition.z;

        camera.position.x = SkyRoads.camera.position.x;
        camera.position.y = SkyRoads.camera.position.y;
        camera.position.z = SkyRoads.camera.position.z;

        vehicle.update();
        ghostCameraTarget.update();

        camera.lookAt(ghostCameraTarget.mesh.position);

        renderer.render( scene, camera );

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
        if (SkyRoads.keyboard.keyUp) {
            SkyRoads.vehicle.velocity += SkyRoads.vehicle.acceleration * SkyRoads.delta;
        } else if (SkyRoads.keyboard.keyDown) {
            SkyRoads.vehicle.velocity -= SkyRoads.vehicle.acceleration * SkyRoads.delta;
        }
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






