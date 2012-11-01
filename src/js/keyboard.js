var Keyboard = (function() {


	var accelerate = function () {
		SkyRoads.time = SkyRoads.time + 10;
	}
	var decelerate = function () {
		SkyRoads.time--;	
	}
	var moveLeft = function () {
		SkyRoads.vehicle.position.x--;
	}
	var moveRight = function () {
		SkyRoads.vehicle.position.x++;	
	}

	var onKeyDown = function (e) {
		var keyCode = e.which;

		switch(keyCode) {
			case 38:
				accelerate();
				break;
			case 40:
				decelerate();
				break;
			case 37:
				moveLeft();
				break;
			case 39:
				moveRight();
				break;
			
		}
	}





	var init = function () {
		$(document).keydown(onKeyDown);
	}


	$(init);


	return 
	{

	}

})();