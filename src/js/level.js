var Level = (function() {
	var tiles = [];

	function init() {
		addTile({ x: 0,	y: 0, h: 20 });
	}

	// tileProps: x, y, h, type
	function addTile(tileProps) {
		var cellWidth = SkyRoads.cell.size.x;
		var tile = new Tile(
				tileProps.x	* cellWidth - 3 * cellWidth,
				tileProps.y,
				tileProps.h
			);
		tile.type = tileProps.type || 'full';
		tiles.push( tile );
	}

	init();

	return {
		tiles: tiles
	};
}());