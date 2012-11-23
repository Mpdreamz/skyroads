// tileProps: x, z, h, type
var Tile = (function (tileProps) {
    var mesh, cell;


    function setColor() {
         switch(cell.type) {
            case "booster":
                mesh.material.color.setHex(0x00ff00);
                break;
            case "explosive":
                mesh.material.color.setHex(0xff0000);
                break;
            case "start":
                mesh.material.color.setHex(0xFF7400);
                break;
            case "end":
                mesh.material.color.setHex(0xCD0074);
                break;
            default:
                mesh.material.color.setHex(0x0000ff);
                break;
        }
    }

    function _createMaterial() {
        switch(cell.type) {
            case "booster":
                return new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            case "explosive":
                return new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
            case "start":
                return new THREE.MeshBasicMaterial( { color: 0xFF7400 } ); 
            case "end":
                return new THREE.MeshBasicMaterial( { color: 0xCD0074 } ); 

                
            default:
                return new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        }

    }


    function init(tileProps) {
        
        cell = tileProps;
        cell.type = tileProps.type || 'basic';
        cell.h = tileProps.h || 20;

        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = _createMaterial();

        mesh = new THREE.Mesh( g, m );
        
        mesh._isTile = true;

        update();
    }

    function update() {
        var cellWidth = SkyRoads.cell.size.x;
        mesh.position.x = cell.x * cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth;
        mesh.position.y = 0 + (cell.h / 2);
        mesh.position.z = - cell.z * cellWidth;

        mesh.scale.x = SkyRoads.cell.size.x;
        mesh.scale.y = cell.h || SkyRoads.cell.size.y;
        mesh.scale.z = SkyRoads.cell.size.x;
    }

    init(tileProps);

    return {
        mesh: mesh,
        update: update,
        cell: cell,
        setColor : setColor
    };
});