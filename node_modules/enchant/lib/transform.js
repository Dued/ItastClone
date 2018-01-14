var _ = require('lodash');
var transforms = require('./transforms');

function Transform () {
	this._defaultValue = undefined;
	this._transforms = [];
	this._bindTransformsInterface();
}

Transform.prototype._bindTransformsInterface =  function _bindTransformsInterface () {
	// Bind available transform functions
	for (var method in transforms) {
		this[method] = buildPushTransform(method);
	}

	function buildPushTransform (method) {
		// Push transform function with arguments to the transforms chain
		return function pushTransform () {
			this._transforms.push({
				func: transforms[method],
				args: Array.prototype.slice.apply(arguments)
			});

			return this;
		}
	}
};

Transform.prototype.apply = function apply (val) {
	if (_.isUndefined(val) || _.isNull(val)) {
		val = this._defaultValue;
	}

	// Apply transform by transform
	return this._transforms.reduce(applyFunction, val);

	function applyFunction (targetValue, transform) {
		return transform.func.apply(null, [targetValue].concat(transform.args));
	}
};

Transform.prototype.def = function def (defaultValue) {
	this._defaultValue = defaultValue;
	return this;
};

module.exports = Transform;
