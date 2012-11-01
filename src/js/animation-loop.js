var Scene = (function () {
    var camera, scene, renderer;
    var geometry, material, mesh;

    var vehicle;

    var initScene = function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 1, 1, 1 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        vehicle = new Vehicle();

        scene.add(vehicle.mesh);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );
    }


    var animate = function animate() {
        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.scale.x = SkyRoads.plane.size.x;
        mesh.scale.y = SkyRoads.plane.size.y;
        mesh.scale.z = SkyRoads.plane.size.z;
        mesh.rotation.x = SkyRoads.plane.rotation.x.toRadians();
        mesh.rotation.y = SkyRoads.plane.rotation.y.toRadians();
        mesh.rotation.z = SkyRoads.plane.rotation.z.toRadians();

        camera.position.x = SkyRoads.camera.position.x;
        camera.position.y = SkyRoads.camera.position.y;
        camera.position.z = SkyRoads.camera.position.z;

        vehicle.update();

        camera.lookAt(vehicle.mesh.position);



        // camera.target.position.x = 0;
        // camera.target.position.y = 0;
        // camera.target.position.z = 0;

        renderer.render( scene, camera );

    }

    $(function() {
        initScene();
        animate();
    });

    return { 
        
    }

})();


var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        mesh =  new THREE.Mesh( g, m );
        update();
    }

    var update = function () {
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







