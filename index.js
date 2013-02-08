var connective = require('connective')

function tracery (structure) {
  return function (obj) {
    for (var key in structure) {
      var test = is(structure[key])
      var prop = obj[key]
      if (!test(prop)) {
        return false
      }
    }
    return true
  }
}

function isTypeof(type) {
  return function (subject) {
    return typeof subject === type
  }
}

function isRegExMatch(regex) {
  return connective.and(isString, regex.test)
}

var isFunction = isTypeof('function')
var isBoolean = isTypeof('boolean')
var isObject = isTypeof('object')
var isNull = function(x) { return x === null }
var isUndefined = isTypeof('undefined')
var isNumber = connective.and(isTypeof('number'), connective.not(Number.isNaN))
var isString = isTypeof('string')

function K(val) {
  return function () { return val }
}

function is (predicate) {

  if (predicate === Function) return isFunction
  if (predicate === Boolean) return isBoolean
  if (predicate === Object) return isObject
  if (predicate === Number) return isNumber
  if (predicate === String) return isString
  if (predicate === Array) return Array.isArray

  if (predicate instanceof RegExp) return isRegExMatch(predicate)
  return isFunction(predicate) ? predicate : K(false)
}

function Optional (x) {
  return connective.or(is(x), isUndefined)
}

function Nullable (x) {
  return connective.or(is(x), isNull)
}

module.exports = tracery
module.exports.Collection = require('./collection')
module.exports.Optional = Optional
module.exports.Nullable = Nullable

module.exports.is = is
module.exports.isTypeof = isTypeof