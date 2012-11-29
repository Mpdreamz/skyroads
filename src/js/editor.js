var editor = (function() {
	var $el, $table, $saveButton;

	function init() {
		$el = $('#cellEditor');
		$saveButton = $("#save");

		$saveButton.click(save);

		$(document).bind("level-loaded", renderFilledCells);

		render();
		renderFilledCells();

		$el.niceScroll();

		$(".btn-toggle").click(function () {
			var hl = $(this).data("highlight");
			$(this).find("button").removeClass(hl).removeClass("selected");
			$(event.target).closest("button").addClass(hl).addClass("selected");

		});

		$el.scrollTop($table.height());
	}

	function getPen() {
		var penSize = parseInt($("#pen-size button.selected").data("value"), 10);
		var penType = $("#pen-type button.selected").data("value");
		var blockType = $("#block-type button.selected").data("value");
		return { size : penSize, type: penType, block : blockType};
	}

	function save() {
		var levelName = $("#level-name").val();
		if (!levelName)
			return;

		var cells = _.map(Level.getTiles(), function (tile) {
			return tile.cell;
		});
		var data = JSON.stringify(cells);
		$.jStorage.set("level-" + levelName, data);
	}

	function onClickCell () {
		var x = $(this).data("x");
		var z = $(this).data("z");

		var pen = getPen();

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
					Level.addTile({ x: lx, z: lz, type : pen.block});
					break;
				case "raise":
					if (!Level.positionOccupied(lx, lz))
						Level.addTile({ x: lx, z: lz, type : pen.block });

					Level.increaseTileHeight(lx, lz);
					break;
				case "remove":
					Level.removeTile(lx, lz);
					break;
			}

			$(this).removeClass("basic booster explosive start end");

			if (operation != "remove")
			{
				$(this).addClass(pen.block);
			}
			
		});

		Scene.updateScene();

		
	}

	function onCellHoverIn()
	{
		var x = $(this).data("x");
		var z = $(this).data("z");
		$(this).addClass("real-hover");
		var elements = $(this).add(getElements(x, z));
		elements.addClass("hover");

		var operation = "icon-plus-sign";
		if (event.shiftKey)
			operation = "icon-arrow-up";
		else if (event.ctrlKey)
			operation = "icon-remove-sign";

		elements.addClass(operation);
	}

	function getElements(x, z) {
		x = parseInt(x, 10);
		z = parseInt(z, 10);

		var pen = getPen();
		var size = pen.size;

		return $("#cellEditor tr:gt("+ ((SkyRoads.cell.maxGrid.z - z) - 6) +"):lt("+ ((SkyRoads.cell.maxGrid.z - z) + 6) +") td").filter(function (index) {
			var lx = $(this).data("x");
			var lz = $(this).data("z");
			switch(pen.type) {
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
		$(this).removeClass("real-hover");
		var elements = $(this).add(getElements(x, z));
		elements.removeClass("hover icon-plus-sign icon-remove-sign icon-arrow-up");
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
		var elements = $el.find(".basic, .booster, .explosive, .start, .end");
		elements.removeClass("basic");
		elements.removeClass("booster");
		elements.removeClass("explosive");
		elements.removeClass("start");
		elements.removeClass("end");

		_.each(Level.getTiles(), function(t) {
			var $td = $("td[data-x='"+t.cell.x+"'][data-z='"+t.cell.z+"']");
			$td.removeClass("basic");
			$td.removeClass("booster");
			$td.removeClass("explosive");
			$td.removeClass("start");
			$td.removeClass("end");
			$td.addClass(t.cell.type || "basic");
		});
	}

	var prevTile = null;
	function updateEditorWindow(position) {
		// calculate in what row we are now, and what the scrollTop is for that row.
		if (!$el)
			return;


		if (prevTile)
		{
			prevTile.removeClass("player-on-tile");
		}
		var tile = Level.getTileAt(position.x, position.z);
		if (!tile || !tile.cell) {
			return;
		}
		var currentEditorTile = $el.find("td[data-x='"+tile.cell.x+"'][data-z='"+tile.cell.z+"']");
		if (currentEditorTile)
		{
			currentEditorTile.addClass("player-on-tile");
			prevTile = currentEditorTile;
		}

		// var bottom = 500 + Math.abs( position.z * (30.0 / SkyRoads.cell.size.x) );
		// if ($el) {
		// }
	}

	$(init);

	return {
		updateEditorWindow: updateEditorWindow
	};
}());

