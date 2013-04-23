// tileProps: x, z, h, type
var Tile = (function (tileProps) {
	var mesh, cell;

	function getColor() {
		// http://colorschemedesigner.com/#3w41Tw0w0w0w0
		var colors = [0x0A64A4, 0x1A1EB2, 0xFFBE00, 0xFF9000, 0xFFFFFF];
		return colors[cell.color];
	}

	function _createMaterial() {
		switch(cell.type) {
			case "booster":
				return new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
			case "explosive":
				return new THREE.MeshLambertMaterial( { color: 0xff0000 } );
			case "start":
				return new THREE.MeshLambertMaterial( { color: 0xFF7400 } );
			case "end":
				return new THREE.MeshLambertMaterial( { color: 0xCD0074 } );
			default:
				var color = getColor();
				return new THREE.MeshLambertMaterial( { color: color } );
		}
	}

	function init(tileProps) {

		cell = tileProps;
		cell.type = tileProps.type || 'basic';
		cell.color = tileProps.color || 1;
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
		cell: cell
	};
});
