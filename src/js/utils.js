var utils = (function() {
	function deepCopy(object) {
		return $.extend(true, {}, object);
		
	}

	return {
		deepCopy: deepCopy
	}
}())