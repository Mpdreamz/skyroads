var StateEditor = (function()
{
	var init = function() {

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
                g.open()
            }
            else {
                if (parentKey == "rotation")
                {
                    gui.add(obj, key, -180, 180);
                }
                else if (parentKey == "size")
                {
                    gui.add(obj, key, 0, 1000);
                }
                else {
                    gui.add(obj, key, -1000, 1000);
                }
            }
            
        });
    };
    return {
    	init: init;
    }
})