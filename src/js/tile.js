// tileProps: x, z, h, type
var Tile = (function (tileProps) {
	var mesh, cell;

	function getColor() {
		// http://colorschemedesigner.com/#3w41Tw0w0w0w0
		var colors = [0x0A64A4, 0x1A1EB2, 0xFFBE00, 0xFF9000, 0xFFFFFF];
		return colors[cell.color];
	}

	function _createGeometry() {
		switch(cell.type) {
			case "tunnel":
				var pts = [
	            new THREE.Vector3( 0.50,0, 0.50),//top left
	            new THREE.Vector3( 0.40,0, 0.50),//top right
	            new THREE.Vector3( 0.40,0,-0.50),//bottom right
	            new THREE.Vector3( 0.50,0,-0.50),//bottom left
	            new THREE.Vector3( 0.50,0, 0.50)//back to top left - close square path
           		];
           		var tunnel = new THREE.LatheGeometry( pts, 12, Math.PI );
				var tile = new THREE.CubeGeometry( 1, 0.2, 1 ); 
           		var merged = THREE.GeometryUtils.merge(tunnel, tile);
           		return tunnel;
			default:
				return new THREE.CubeGeometry( 1, 1, 1 ); 
		}
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
			case "tunnel":
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
		if (cell.type == "tunnel")
			cell.h = 200;

		var g = _createGeometry();
		var m = _createMaterial();

		mesh = new THREE.Mesh( g, m );

		mesh._isTile = true;

		update();
	}

	function update() {
		var cellWidth = SkyRoads.cell.size.x;
		mesh.position.x = cell.x * cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth;
		if (cell.type != "tunnel")
			mesh.position.y = 0 + (cell.h / 2);
		else
			mesh.position.y = 0;
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
