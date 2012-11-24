$(function () {

	$(window).bind("popstate", function(event) {
		var level = document.location.hash;
		if (level && level != "#") {
			$("#gameWindow").show();
			$("#menuWindow").hide();
			level = level.substr(1, level.length -1);
			$("#menuWindow").hide();
			$("#gameWindow").show();
			Level.load(level);
		}
		else { 
			$("#gameWindow").hide();
			$("#menuWindow").show();
		}
	});

});
