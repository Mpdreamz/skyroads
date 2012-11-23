var GhostCameraTarget = (function () {
    var mesh;

    var init = function () {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { } );
        mesh =  new THREE.Mesh( g, m );
        update();
    };

    var update = function (){
        //mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.targetOffset;
    };

    init();

    return {
        update: update,
        mesh: mesh
    };
});