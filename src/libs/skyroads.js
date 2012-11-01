var camera, scene, renderer;
var geometry, material, mesh;


var SkyRoads = (function() {
    var plane = {
        size : { x: 200, y: 10, z: 200 },
        rotation : { x: 0, y: 0, z: 0 }
    };

    var camera = {
        position : { x:0, y:0, z:-500 }
    };

    return {
        plane: plane,
        camera: camera
    }

})();

$(function() {
    var gui = new dat.GUI();
    var plane = gui.addFolder("Plane");
    plane.open();
    var planeSize = plane.addFolder("Size");
    planeSize.add(SkyRoads.plane.size, 'x', 0, 1000);
    planeSize.add(SkyRoads.plane.size, 'y', 0, 1000);
    planeSize.add(SkyRoads.plane.size, 'z', 0, 1000);
    planeSize.open();
    var planeRotation = plane.addFolder("Rotation");
    planeRotation.add(SkyRoads.plane.rotation, 'x', -180, 180);
    planeRotation.add(SkyRoads.plane.rotation, 'y', -180, 180);
    planeRotation.add(SkyRoads.plane.rotation, 'z', -180, 180);
    planeRotation.open();    
    

    var camera = gui.addFolder("Camera");
    var cameraRotation = camera.addFolder("Position");

    cameraRotation.add(SkyRoads.camera.position, 'y', -1000, 1000);
    cameraRotation.add(SkyRoads.camera.position, 'x', -1000, 1000);
    cameraRotation.add(SkyRoads.camera.position, 'z', -1000, 1000);


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

    geometry = new THREE.CubeGeometry( 1, 1, 1 );
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

    mesh.scale.x = SkyRoads.plane.size.x;
    mesh.scale.y = SkyRoads.plane.size.y;
    mesh.scale.z = SkyRoads.plane.size.z;
    mesh.rotation.x = deg2rad(SkyRoads.plane.rotation.x);
    mesh.rotation.y = deg2rad(SkyRoads.plane.rotation.y);
    mesh.rotation.z = deg2rad(SkyRoads.plane.rotation.z);

    camera.position.x = SkyRoads.camera.position.x;
    camera.position.y = SkyRoads.camera.position.y;
    camera.position.z = SkyRoads.camera.position.z;

    camera.lookAt(mesh.position);

    // camera.target.position.x = 0;
    // camera.target.position.y = 0;
    // camera.target.position.z = 0;

    renderer.render( scene, camera );

}

function deg2rad(value) {
    return (value / 360) * 2 * Math.PI;
}

