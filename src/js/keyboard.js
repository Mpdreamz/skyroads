var Keyboard = (function() {

	var onKeyDown = function (e) {
		var keyCode = e.which;
		switch(keyCode) {
			case 87: // w
			case 38:
				SkyRoads.keyboard.keyUp = true;
				break;
			case 83: // s
			case 40:
				SkyRoads.keyboard.keyDown = true;
				break;
			case 65: // a
			case 37:
				SkyRoads.keyboard.keyLeft = true;
				break;
			case 68: // d
			case 39:
				SkyRoads.keyboard.keyRight = true;
				break;
			case 32:
				SkyRoads.keyboard.spacebar = true;
				break;
		}

		if (SkyRoads.vehicle.dead || SkyRoads.vehicle.winning) {
			SkyRoads.restart = true;
		}
	};

	var onKeyUp = function (e) {
		var keyCode = e.which;

		switch(keyCode) {
			case 27:
				document.location = "#";

			case 87: // w
			case 38:
				SkyRoads.keyboard.keyUp = false;
				break;
			case 83: // s
			case 40:
				SkyRoads.keyboard.keyDown = false;
				break;
			case 65: // a
			case 37:
				SkyRoads.keyboard.keyLeft = false;
				break;
			case 68: // d
			case 39:
				SkyRoads.keyboard.keyRight = false;
				break;
			case 32:
				SkyRoads.keyboard.spacebar = false;
				break;
		}
	};

	var init = function () {
		$(document).keydown(onKeyDown);
		$(document).keyup(onKeyUp);
	};

	var update = function () {
    };

	$(init);

	return {
		update: update
	};

});