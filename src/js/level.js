var Level = (function() {
	var tiles = [];

	function init() {
		addTile({ x: 1,	z: 0, h: 20 });
		addTile({ x: 2,	z: 0, h: 20 });
		addTile({ x: 3,	z: 0, h: 20 });
		addTile({ x: 4,	z: 0, h: 20 });
		addTile({ x: 5,	z: 0, h: 20 });
		addTile({ x: 1,	z: 1, h: 60 });
		// addTile({ x: 2,	z: 1, h: 20 });
		// addTile({ x: 3,	z: 1, h: 20 });
		// addTile({ x: 4,	z: 1, h: 20 });
		addTile({ x: 5,	z: 1, h: 60 });
		addTile({ x: 1,	z: 2, h: 60 });
		addTile({ x: 2,	z: 2, h: 20 });
		addTile({ x: 3,	z: 2, h: 20 });
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
		if ( !positionOccupied(tileProps.x, tileProps.z) ) {
			var tile = new Tile(tileProps)
			tiles.push( tile );
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
		console.log(Scene.SkyRoadsCopy, SkyRoads);
		tiles = [];
		_.each(data, function (cell) {
			addTile(cell);
		});
		SkyRoads = utils.deepCopy(Scene.SkyRoadsCopy);
	}

	function getMeshes() {
		return _.map(tiles, function (tile) { return tile.mesh; } );
	}


	init();


	return {
		increaseTileHeight: increaseTileHeight,
		getTileAt : getTileAt,
		getTiles: getTiles,
		addTile: addTile,
		removeTile: removeTile,
		positionOccupied: positionOccupied,
		getMeshes: getMeshes,
		loadFromJsonData: loadFromJsonData
	};
}());