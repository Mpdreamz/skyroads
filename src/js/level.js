var Level = (function() {
	var tiles = [];

	function init() {
		addTile({ x: 1,	z: 0, h: 40 });
		addTile({ x: 2,	z: 0, h: 20 });
		addTile({ x: 3,	z: 0, h: 20 });
		addTile({ x: 3,	z: 2, h: 20 });
	}

	// tileProps: x, z, h, type
	function addTile(tileProps) {
		var cellWidth = SkyRoads.cell.size.x;

		var tile = new Tile(
				tileProps.x	* cellWidth - Math.floor(SkyRoads.cell.maxGrid.x / 2) * cellWidth,
				-tileProps.z * cellWidth,
				tileProps.h || 20
			);
		tile.type = tileProps.type || 'full';

		// check if this tile space was already occupied. If so, do nothing
		var isAlreadyPresent = false;

		_.each(tiles, function(t) {
			if ( t.equals(tile) ) {
				isAlreadyPresent = true;
			}

		});

		if ( !isAlreadyPresent ) {
			tiles.push( tile );
		}
	}

	init();

	return {
		tiles: tiles,
		addTile: addTile
	};
}());