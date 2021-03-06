/**
 * Imports
 */
var util = require('util');
var crypto = require('crypto');

/*******************************************************************************
 * Storage
 ******************************************************************************/
/**
 * Storage constructor
 * 
 * @constructor
 * @param {Object} options
 * @return
 */
function Storage(options) {
	options = options || {};
	this._manager = options.manager;
}

/**
 * Must return true if the session SID exist
 * 
 * @param {string|number} sid
 * @return {boolean}
 */
Storage.prototype.exist = function(sid) {
	throw new ErrorNotImplemented();
};

/**
 * Must create a new session
 * 
 * @param {session.Session} session
 * @return undefined
 */
Storage.prototype.create = function(session) {
	throw new ErrorNotImplemented();
};

/**
 * Must update the session
 * 
 * @param {session.Session} session
 * @return undefined
 */
Storage.prototype.update = function(session) {
	throw new ErrorNotImplemented();
};

/**
 * Must read the session
 * 
 * @param {session.Session} session
 * @return undefined
 */
Storage.prototype.read = function(session) {
	throw new ErrorNotImplemented();
};

/**
 * Must remove specified session
 * 
 * @param {session.Session} session
 * @return undefined
 */
Storage.prototype.remove = function(session) {
	throw new ErrorNotImplemented();
};

/**
 * Must remove all sessions
 * 
 * @return undefined
 */
Storage.prototype.flush = function() {
	throw new ErrorNotImplemented();
};

/**
 * Must clean all expired sessions
 * 
 * @return undefined
 */
Storage.prototype.clean = function() {
	throw new ErrorNotImplemented();
};

/**
 * 
 * @param data
 * @return {string}
 */
Storage.prototype.encode = function(data) {
	var encoded = JSON.stringify(data);
	var md5 = '' + crypto.createHash('md5').update(encoded).digest('hex');
	return encoded + md5;
};

Storage.prototype.decode = function(string) {
	var index = string.length - 32;
	var md5 = string.substr(string.length - 32);
	var encoded = string.substr(0, index);

	if (crypto.createHash('md5').update(encoded).digest('hex') != md5) {
		throw new Error('md5 check fail');
	}

	return JSON.parse(encoded);
};

/*******************************************************************************
 * Errors
 ******************************************************************************/
function ErrorNotImplemented(message) {
	this.name = 'IMPLEMENTATION_ERROR';
	this.message = message || 'Not Implemented';
}
util.inherits(ErrorNotImplemented, Error);

function ErrorCreate(message) {
	this.name = 'SESSION_CREATION';
	this.message = message || 'Session cannot be created';
}
util.inherits(ErrorCreate, Error);

function ErrorExpired(message) {
	this.name = 'SESSION_EXPIRED';
	this.message = message || 'Session has expired';
	Error.call(this);
}
util.inherits(ErrorExpired, Error);

function ErrorInexistent(message) {
	this.name = 'SESSION_INEXISTENT';
	this.message = message || 'Session does not exist';
}
util.inherits(ErrorInexistent, Error);

/**
 * Exports
 */
exports.Storage = Storage;
exports.ErrorNotImplemented = ErrorNotImplemented;
exports.ErrorCreate = ErrorCreate;
exports.ErrorExpired = ErrorExpired;
exports.ErrorInexistent = ErrorInexistent;