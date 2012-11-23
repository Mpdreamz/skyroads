var editor = (function() {
	var $el, $table;

	function init() {
		$el = $('#editorWindow');

		render();
		renderFilledCells();


		$el.scrollTop($table.height());
	}
	function onClickCell () {
		var x = $(this).data("x");
		var z = $(this).data("z");

		Level.addTile({ x: x, z: z});
		Scene.updateScene();
		renderFilledCells();
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
			}
		}
	}

	function renderFilledCells() {
		$el.find('td').each(function(i, td) {
			var x = $(td).attr('data-x'),
				z = $(td).attr('data-z');
			if ( Level.positionOccupied(x, z) ) {
				$(td).addClass('occupied');
			}
			else {
				$(td).removeClass('occupied');	
			}
		});
	}

	$(init);

	return {

	};
}());