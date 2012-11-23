var StateEditor = (function()
{
    var gui;

	function init() {
        if (gui !== undefined) {
            $(gui.domElement).remove();
        }

        gui = new dat.GUI();
        object2Folder(gui, SkyRoads);
	}

	function object2Folder(gui, obj, parentKey)
    {
        $.each(obj, function(key, value) 
        { 
            if (typeof(value) == "function")
                return;

            if (typeof(value) == "object")
            {
                var g = gui.addFolder(key);
                object2Folder(g, value, key);
            }
            else {
                if (parentKey == "rotation")
                {
                    gui.add(obj, key, -180, 180).listen();
                }
                else if (parentKey == "size")
                {
                    gui.add(obj, key, 0, 1000).listen();
                }
                else {
                    gui.add(obj, key, -1000, 1000).listen();
                }
                //gui.close()
            }
            
        });
    };
    
    init();

    return {
        init: init,
        gui: gui
    };
})();