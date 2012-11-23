// tileProps: x, z, h, type
var Tile = (function (tileProps) {
    var mesh, height, cell;

    function init (tileProps) {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        
        cell = tileProps;
        cell.type = tileProps.type || 'full';
        cell.h = tileProps.h || 20;

        mesh = new THREE.Mesh( g, m );
        
        var cellWidth = SkyRoads.cell.size.x;
        mesh.position.x = tileProps.x * cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth;
        mesh.position.y = 0 + (cell.h / 2);
        mesh.position.z = - cell.z * cellWidth;

        mesh._isTile = true;

        update();
    }

    function update() {
        mesh.scale.x = SkyRoads.cell.size.x;
        mesh.scale.y = cell.h || SkyRoads.cell.size.y;
        mesh.scale.z = SkyRoads.cell.size.x;
    }

    init(tileProps);

    return {
        mesh: mesh,
        update: update,
        cell: cell
    };
});