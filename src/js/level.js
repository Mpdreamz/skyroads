var Level = (function() {
	var tiles = [];

	function init() {
		
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
		if ( !positionOccupied(tileProps.x, tileProps.z) ) {
			var tile = new Tile(tileProps);
			tiles.push( tile );
		}
		else {
			removeTile(tileProps.x, tileProps.z);
			var newTile = new Tile(tileProps);
			tiles.push( newTile );
		}

	}
	function removeTile(columnX, columnZ) {
		tiles = _.reject(tiles, function(t){ return t.cell.x == columnX && t.cell.z == columnZ; });
	}


	function positionOccupied(columnX, columnZ) {
		var cellWidth = SkyRoads.cell.size.x;

		return _.any(tiles, function(t) {
			return t.cell.x == columnX && t.cell.z == columnZ;
		});
	}
	function getTiles() {
		return tiles;
	}
	function increaseTileHeight(columnX, columnZ)
	{
		var tile = _.find(tiles, function(t) {
			return t.cell.x == columnX && t.cell.z == columnZ;
		});
		if (!tile)
			return;
		tile.cell.h = tile.cell.h % 140;
		tile.cell.h += 20;
		tile.update();
	}
	function loadFromJsonData(data) {
		tiles = [];
		_.each(data, function (cell) {
			addTile(cell);
		});
	}

	init();


	return {
		increaseTileHeight: increaseTileHeight,
		getTileAt : getTileAt,
		getTiles: getTiles,
		addTile: addTile,
		removeTile: removeTile,
		positionOccupied: positionOccupied,
		loadFromJsonData: loadFromJsonData
	};
}());