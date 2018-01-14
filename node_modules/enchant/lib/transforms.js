var _ = require('lodash');

function lowercase (val) {
	return val.toLowerCase();
}

function slice (val, start, end) {
	return val.slice(start, end);
}

// Property removal will work because of undefined properties clean up after transforms completed
function del () {
	return undefined;
}

module.exports = {
	lowercase: lowercase,
	slice: slice,
	del: del
};
