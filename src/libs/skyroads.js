var camera, scene, renderer;
var geometry, material, mesh;


var SkyRoads = (function() {
    var plane = {
        size : { x: 200, y: 10, z: 200 },
        rotation : { x: 0, y: 0, z: 0 }
    };

    var camera = {
        position : { x:0, y:240, z:-500 }
    };

    return {
        plane: plane,
        camera: camera
    }

})();


$(function() {
    var gui = new dat.GUI();
    object2Folder(gui, SkyRoads);

    init();
    animate();

});

function object2Folder(gui, obj, parentKey)
{
    $.each(obj, function(key, value) 
    { 
        if (typeof(value) == "object")
        {
            var g = gui.addFolder(key);
            object2Folder(g, value, key);
            g.open()
        }
        else {
            if (parentKey == "rotation")
            {
                gui.add(obj, key, -180, 180);
            }
            else if (parentKey == "size")
            {
                gui.add(obj, key, 0, 1000);
            }
            else {
                gui.add(obj, key, -1000, 1000);
            }
        }
        
    });
}



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

