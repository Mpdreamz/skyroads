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
    };
});