var editor = (function() {
	var $el, $table, $pen, $penSize;

	function init() {
		$el = $('#cellEditor');
		$pen = $("#pen");
		$penSize = $("#pen-size");

		render();
		renderFilledCells();

		$el.scrollTop($table.height());

	}
	function onClickCell () {
		var x = $(this).data("x");
		var z = $(this).data("z");

		var occupied = Level.positionOccupied(x, z);
		var elements = getElements(x, z);
		$.each(elements, function () {
			var lx = $(this).data("x");
			var lz = $(this).data("z");
			if (occupied)
				Level.removeTile(lx, lz);
			else
				Level.addTile({ x: lx, z: lz});
			$(this).toggleClass("occupied", !occupied);
		});

		Scene.updateScene();

		
	}

	function onCellHoverIn()
	{
		var x = $(this).data("x");
		var z = $(this).data("z");
		var elements = $(this).add(getElements(x, z));
		elements.addClass("hover");
	}

	function getElements(x, z ) {
		x = parseInt(x, 10);
		z = parseInt(z, 10);
		var type = $pen.val();
		var size = parseInt($penSize.val(), 10) - 1;
		return $("#cellEditor tr:gt("+ ((SkyRoads.cell.maxGrid.z - z) - 5) +"):lt("+ ((SkyRoads.cell.maxGrid.z - z) + 5) +") td").filter(function (index) {
			var lx = $(this).data("x");
			var lz = $(this).data("z");
			switch(type) {
				case "square":
					return lx >= x && lx <= x + size && lz >= z && lz <= z + size;
				case "vertical-line":
					return lz >= z && lz <= z + size && lx == x;
				case "horizontal-line":
					return lx >= x && lx <= x + size  && lz == z;
			}
			return false;
		});
	}

	function onCellHoverOut()
	{
		var x = $(this).data("x");
		var z = $(this).data("z");
		var elements = $(this).add(getElements(x, z));
		elements.removeClass("hover");
	}



	// Renders the editor window
	function render() {
		$table = $('<table/>').appendTo($el);
		var $row, $td;

		for (var z = SkyRoads.cell.maxGrid.z; z >= 0;z--) {
			$row = $('<tr/>').appendTo($table);

			for (var x = 0; x < SkyRoads.cell.maxGrid.x; x++) {
				$td = $('<td/>').attr('data-x', x).attr('data-z', z).html(' ');
				$td.appendTo($row);
				$td.click(onClickCell);
				$td.hover(onCellHoverIn, onCellHoverOut);
			}
		}
	}

	function renderFilledCells() {
		_.each(Level.getTiles(), function(t) { 
			var $td = $("td[data-x='"+t.cell.x+"'][data-z='"+t.cell.z+"']");
			$td.addClass('occupied');
		});
	}

	$(init);

	return {

	};
}());