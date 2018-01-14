var _ = require('lodash');
var Transform = require('./transform');

function ctr (schema) {
	if (_.isObject(schema)) {
		return createSchema(schema);
	}

	return new Transform();
}

function createSchema (schema) {
	var defaults = buildDefaults(schema);
	return applySchema;

	// Build default object based on schema definition
	function buildDefaults (schema) {
		var defaults = {};

		for (var prop in schema) {
			if (schema[prop]._defaultValue) {
				defaults[prop] = schema[prop]._defaultValue;
			}
		}

		return defaults;
	}

	function applySchema (obj, cb) {
		// Apply defaults to input object
		obj = _.defaults(obj, defaults);

		if (_.isFunction(cb)) {
			return applyAsync(obj, cb);
		}

		return applySync(obj);
	}

	function applyAsync (obj, cb) {
		throw new Error('Async transforms currently not available');
	}

	function applySync (obj) {

		for (var key in obj) {

			// Check if property transform available
			if (schema[key]) {

				// Apply property transform
				obj[key] = schema[key].apply(obj[key]);
			}

			if (_.isUndefined(obj[key])) {
				delete obj[key];
			}
		}

		return obj;
	}
}

module.exports = ctr;
