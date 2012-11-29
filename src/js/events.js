$(function () {

	var playMode;

	function resizeGameWindow(){
		var height = playMode == "edit" ? "500px" : $(document).height();
		var width = playMode == "edit" ? "100%" : $(document).width();

		$("#gameWindow, #death-screen, #winning-screen").height(height);
		$("#gameWindow, #death-screen, #winning-screen").width(width);
		Scene.updateSize();
	}

	$(window).bind("resize", _.throttle(resizeGameWindow, 100));

	$(window).bind("popstate", function(event) {
		var route = document.location.hash;
		if (route && level != "#") {
			route = route.substr(1, route.length -1);

			var level = route.substr(route.indexOf("/") + 1, route.length);
			playMode = route.substr(0, route.indexOf("/"));

			$("#level-name").val(level);
			resizeGameWindow();

			StateEditor.setMode(playMode);

			$("#editorWindow").toggle(playMode == "edit");
			if (StateEditor.gui.domElement)
				$(StateEditor.gui.domElement).toggle(playMode == "edit");
			Level.load(level);
		}
		else {
			window.location.href = "/welcome.html";
		}
	});

});