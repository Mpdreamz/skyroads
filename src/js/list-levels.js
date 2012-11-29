$(function () {
	var levels = _.filter($.jStorage.index(), function (v) {
		return v.length > 6 && v.substr(0, 6) == "level-";
	});
	for (var i = 0, c = 0, $ul; i < levels.length; i++) {
		if (c == 0 || !$ul) {
			$ul = $('<ul class="left" id="block4">').appendTo("#levels");
		}
		var level = levels[i];
		var name = level.substr(level.indexOf("-") + 1, level.length);
		var url = "/#play/" + name;
		$ul.append("<li><a href='"+url+"'>"+ (c + 1) + ". " + name+"</a></li>");

		c = i % 3;
	}
});