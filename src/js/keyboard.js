var Keyboard = (function() {

	var onKeyDown = function (e) {
		var keyCode = e.which;

		switch(keyCode) {
			case 38:
				SkyRoads.keyboard.keyUp = true;
				break;
			case 40:
				SkyRoads.keyboard.keyDown = true;
				break;
			case 37:
				SkyRoads.keyboard.keyLeft = true;
				break;
			case 39:
				SkyRoads.keyboard.keyRight = true;
				break;
			
		}
	}

	var onKeyUp = function (e) {
		var keyCode = e.which;

		switch(keyCode) {
			case 38:
				SkyRoads.keyboard.keyUp = false;
				break;
			case 40:
				SkyRoads.keyboard.keyDown = false;
				break;
			case 37:
				SkyRoads.keyboard.keyLeft = false;
				break;
			case 39:
				SkyRoads.keyboard.keyRight = false;
				break;
			
		}
	}





	var init = function () {
		$(document).keydown(onKeyDown);
		$(document).keyup(onKeyUp);
	}


	$(init);


	return 
	{

	}

})();