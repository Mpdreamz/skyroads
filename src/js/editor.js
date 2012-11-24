var editor = (function() {
	var $el, $table, $pen, $penSize, $penType, $saveButton;

	function init() {
		$el = $('#cellEditor');
		$pen = $("#pen");
		$penSize = $("#pen-size");
		$penType = $("#pen-type");
		$saveButton = $("#save");

		$saveButton.click(save);
		$("#level-selector").change(loadLevel);

		render();
		renderFilledCells();

		$el.mousemove(function () {
			var $realHover = $("#cellEditor .real-hover");
			if (!$realHover)
				return;

			var x = $realHover.data("x");
			var z = $realHover.data("z");

			var elements = $realHover.add(getElements(x, z));
			elements.addClass("hover");

			var operation = "icon-plus-sign";
			if (event.shiftKey)
				operation = "icon-arrow-up";
			else if (event.ctrlKey)
				operation = "icon-remove-sign";

			elements.addClass(operation);
		});

		$table.scrollTop($table.height());
	}

	function save() {
		var cells = _.map(Level.getTiles(), function (tile) {
			return tile.cell;
		});

		$("#level-output").text(JSON.stringify(cells));
	}

	function loadLevel(e) {
		e.preventDefault();
		if (!$("#level-selector").val())
		{
			Level.loadFromJsonData([{ x: Math.floor(SkyRoads.cell.maxGrid.x / 2),	z: 0, h: 20, type: "start" }]);
			renderFilledCells();
			Scene.updateScene();
		}
		else {
			var levelData = $.getJSON("/levels/" + $("#level-selector").val() + ".json")
				.done(function (data) {
					Level.loadFromJsonData(data);
					renderFilledCells();
					Scene.updateScene();
				});
		}
		$("#level-selector").blur();
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

			$(this).removeClass("basic booster explosive");

			if (operation != "remove")
			{
				$(this).addClass(type);
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

	function updateEditorWindow(position) {
		// calculate in what row we are now, and what the scrollTop is for that row.
		var bottom = 500 + Math.abs( position.z * (30.0 / SkyRoads.cell.size.x) );
		if ($el) {
			$el.scrollTop($table.height() - bottom);
		}
	}

	$(init);

	return {
		updateEditorWindow: updateEditorWindow
	};
}());