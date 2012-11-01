var camera, scene, renderer;
var geometry, material, mesh;


var SkyRoads = (function() {
    var rotation = {
        x: 0, y: 0, z: 0
    };

    var camera = {
        rotation : { x:0, y:0, z:0 }
    };

    return {
        rotation: rotation,
        camera: camera
    }

})();

$(function() {
    var gui = new dat.GUI();
    var cube = gui.addFolder("Cube rotation");
    cube.add(SkyRoads.rotation, 'x', -180, 180);
    cube.add(SkyRoads.rotation, 'y', -180, 180);
    cube.add(SkyRoads.rotation, 'z', -180, 180);



    var camera = gui.addFolder("Camera");
    var cameraRotation = camera.addFolder("Rotation");

    cameraRotation.add(SkyRoads.camera.rotation, 'y', -180, 180);
    cameraRotation.add(SkyRoads.camera.rotation, 'z', -180, 180);
    cameraRotation.add(SkyRoads.camera.rotation, 'x', -180, 180);


    gui.open();
    camera.open();
    cameraRotation.open();

    init();
    animate();

});

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry( 200, 10, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x = deg2rad(SkyRoads.rotation.x);
    mesh.rotation.y = deg2rad(SkyRoads.rotation.y);
    mesh.rotation.z = deg2rad(SkyRoads.rotation.z);

    camera.rotation.x = deg2rad(SkyRoads.camera.rotation.x);
    camera.rotation.y = deg2rad(SkyRoads.camera.rotation.y);
    camera.rotation.z = deg2rad(SkyRoads.camera.rotation.z);

    renderer.render( scene, camera );

}

function deg2rad(value) {
    return (value / 360) * 2 * Math.PI;
}

