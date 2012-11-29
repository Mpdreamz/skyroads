var Level = (function() {
	var tiles = [];

	function init() {
		addTile({ x: Math.floor(SkyRoads.cell.maxGrid.x / 2),	z: 0, h: 20, type: "start" });
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
		tile.cell.h = tile.cell.h % 200;
		tile.cell.h += 20;
		tile.update();
	}
	function loadFromJsonData(data) {
		tiles = [];
		_.each(data, function (cell) {
			addTile(cell);
		});
		
		SkyRoads.restart = true;
	}

	function getMeshes(tile) {
		if (!tile || !tile.cell)
			return;

		var x = tile.cell.x;
		var z = tile.cell.z;
		var radius = 3;
		var surroudingTiles = _.filter(tiles, function (t) {
			var lx = t.cell.x;
			var lz = t.cell.z;
			return lx >= (x - radius) && lx < (x + radius) && lz >= (z - radius) && lz < (z + radius);
		});


		return _.map(surroudingTiles, function (t) { return t.mesh; } );
	}

	function restart() {
		SkyRoads = utils.deepCopy(Scene.SkyRoadsCopy);
		StateEditor.init();
		$("#death-screen").hide();
		$("#winning-screen").hide();
	}

	function getStartTile() {
		return _.find(Level.getTiles(), function(tile) {
            if (tile.cell.type == "start") {
                return tile;
            }
        });
	}

	init();

	function load(level) {
		var data = $.jStorage.get("level-" + level);
		if (data) {
			var levelData = JSON.parse(data);
			Level.loadFromJsonData(levelData);
			Scene.updateScene();
			$(document).trigger("level-loaded");
		}
		else {
			$.getJSON("/levels/" + level + ".json?t=" + new Date().getTime())
				.done(function (data) {
					Level.loadFromJsonData(data);
					Scene.updateScene();
					$(document).trigger("level-loaded");
				});
		}
	}


	return {
		increaseTileHeight: increaseTileHeight,
		getTileAt : getTileAt,
		getTiles: getTiles,
		addTile: addTile,
		removeTile: removeTile,
		positionOccupied: positionOccupied,
		getMeshes: getMeshes,
		loadFromJsonData: loadFromJsonData,
		restart: restart,
		load : load,
		getStartTile : getStartTile
	};
}());