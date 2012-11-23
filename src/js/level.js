var Level = (function() {
	var tiles = [];

	function init() {
		addTile({ x: 1,	z: 0, h: 40 });
		addTile({ x: 2,	z: 0, h: 20 });
		addTile({ x: 3,	z: 0, h: 20 });
		addTile({ x: 4,	z: 2, h: 20 });
	}

	function getTileAt(x, z) {
		var radius = SkyRoads.cell.size.x / 2;
		return _.find(tiles, function(tile) {
			return (x >= tile.mesh.position.x - radius && x <= tile.mesh.position.x + radius) &&
				(z >= tile.mesh.position.z - radius && z <= tile.mesh.position.z + radius);
		});
	}

	// tileProps: x, z, h, type
	function addTile(tileProps) {
		var cellWidth = SkyRoads.cell.size.x;

		if ( !positionOccupied(tileProps.x, tileProps.z) ) {
			var tile = new Tile(
					tileProps.x	* cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth,
					-tileProps.z * cellWidth,
					tileProps.h || 20
				);
			tile.type = tileProps.type || 'full';
			tiles.push( tile );
		}
	}

	function positionOccupied(x, z) {
		var isAlreadyPresent = false;
		var cellWidth = SkyRoads.cell.size.x;

		_.each(tiles, function(t) {
			if ( t.mesh.position.x == x * cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth &&
				t.mesh.position.z == -(z * cellWidth) ) {
				isAlreadyPresent = true;
			}
		});
		return isAlreadyPresent;
	}

	function getMeshes() {
		var result = [];
		_.each(tiles, function(tile) {
			result.push(tile.mesh);
		});
		return result;
	}

	init();

	return {
		getTileAt: getTileAt,
		getMeshes: getMeshes,
		tiles: tiles,
		addTile: addTile,
		positionOccupied: positionOccupied
	};
}());