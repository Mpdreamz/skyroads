var utils = (function() {
	function deepCopy(object) {
		var json = JSON.stringify(object);
		return JSON.parse(json);
	}

	return {
		deepCopy: deepCopy
	};
}());