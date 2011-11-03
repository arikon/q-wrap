var Q = require('q');

/**
 * Runs an async function with last callback argument and returns a promise
 * @param {Function} func  async function with last callback argument
 * @returns promise for the return value or array of returns values
 *          from the callback from the function
 */
exports.execute = function(func) {
    var args = Array.prototype.slice.call(arguments, 1),
        defer = Q.defer();

    args.push(function(err, res) {
        if (err) return defer.reject(err);
        if (arguments.length > 2) {
            return defer.resolve(Array.prototype.slice.call(arguments, 1));
        }
        return defer.resolve(res);
    });
    func.apply(this, args);
    return defer.promise;
};

/**
 * Converts an async function to a promise returning function
 * @param {Function} func  async function with last callback argument
 * @returns Function that returns a promise
 */
exports.convert = function(func, callbackNotDeclared) {
    var arity = func.length;
    if (callbackNotDeclared) {
        arity++;
    }
    return function() {
        var defer = Q.defer();
        arguments.length = arity;
        arguments[arity - 1] = function(err, res) {
            if (err) return defer.reject(err);
            if (arguments.length > 2) {
                return defer.resolve(Array.prototype.slice.call(arguments, 1));
            }
            return defer.resolve(res);
        };
        func.apply(this, arguments);
        return defer.promise;
    };
};
