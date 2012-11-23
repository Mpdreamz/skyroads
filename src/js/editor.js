var editor = (function() {
	var $el, $table, $pen, $penSize, $penType;

	function init() {
		$el = $('#cellEditor');
		$pen = $("#pen");
		$penSize = $("#pen-size");
		$penType = $("#pen-type");

		render();
		renderFilledCells();

		$el.scrollTop($table.height());

	}
	function onClickCell () {
		var x = $(this).data("x");
		var z = $(this).data("z");

		var type = $penType.val();

		var operation = "add";
		if (event.shiftKey)
			operation = "raise";
		else if (event.ctrlKey)
			operation = "remove";

		var elements = getElements(x, z);
		$.each(elements, function () {
			var lx = $(this).data("x");
			var lz = $(this).data("z");
			switch (operation)
			{
				case "add":
					Level.addTile({ x: lx, z: lz, type : type});
					break;
				case "raise":
					if (!Level.positionOccupied(lx, lz))
						Level.addTile({ x: lx, z: lz, type : type });

					Level.increaseTileHeight(lx, lz);
					break;
				case "remove":
					Level.removeTile(lx, lz);
					break;
			}

			$(this).removeClass("basic");
			$(this).removeClass("booster");
			$(this).removeClass("explosive");

			if (operation != "remove")
				$(this).addClass(type);
			
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
		var size = parseInt($penSize.val(), 10);
		return $("#cellEditor tr:gt("+ ((SkyRoads.cell.maxGrid.z - z) - 10) +"):lt("+ ((SkyRoads.cell.maxGrid.z - z) + 10) +") td").filter(function (index) {
			var lx = $(this).data("x");
			var lz = $(this).data("z");
			switch(type) {
				case "square":
					return lx >= x && lx < (x + size) && lz >= z && lz < (z + size);
				case "vertical-line":
					return lz >= z && lz < (z + size) && lx == x;
				case "horizontal-line":
					return lx >= x && lx < (x + size) && lz == z;
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
			$td.removeClass("basic");
			$td.removeClass("booster");
			$td.removeClass("explosive");
			$td.addClass(t.cell.type || "basic");
		});
	}

	$(init);

	return {

	};
}());