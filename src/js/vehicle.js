var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        mesh =  new THREE.Mesh( g, m );
        update();
    }

    var update = function () {
        SkyRoads.vehicle.position.z -= SkyRoads.vehicle.velocity;

        mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z;

        mesh.scale.x = SkyRoads.vehicle.size.x;
        mesh.scale.y = SkyRoads.vehicle.size.y;
        mesh.scale.z = SkyRoads.vehicle.size.z;
    };

    init();

    return {
        update: update,
        mesh: mesh
    };

});