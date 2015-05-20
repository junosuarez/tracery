var connective = require('connective')
var K = require('ski/k')



function all(predicate) {
  return function (arr) {
    return arr.every(predicate)
  }
}

is.TypeOf = function (type) {
  type = type.toLowerCase()
  return function (subject) {
    return typeof subject === type
  }
}

is.ObjectOf = function (constructorName) {
  var signature = '[object ' + constructorName + ']'
  return function (subject) {
    return Object.prototype.toString.call(subject) === signature;
  }
}

is.RegExMatch = function (regex) {
  return function (str) {
    return is.String(str) && regex.test(str)
  }
}

is.Null = function(x) { return x === null }
is.Number = connective.and(is.TypeOf('number'), connective.not(Number.isNaN))

var types = [
  'Function',
  'Boolean',
  'Object',
  'Undefined',
  'String'
]
types.forEach(function (type) {
  is[type] = is.TypeOf(type)
})

var builtins = [
  'Date',
  'RegExp',
  'DataView',
  'ArrayBuffer',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array'
]
builtins.forEach(function(cons) {
  is[cons] = is.ObjectOf(cons)
})

function is (predicate) {
  if (predicate === Function) return is.Function
  if (predicate === Boolean) return is.Boolean
  if (predicate === Object) return is.Object
  if (predicate === Number) return is.Number
  if (predicate === String) return is.String
  if (predicate === Array) return Array.isArray

  if (predicate && predicate.name && predicate.name in global) return is[predicate.name]

  if (predicate instanceof RegExp) return is.RegExMatch(predicate)
  if (is.Function(predicate)) return predicate
  if (is.Null(predicate)) return is.Null
  if (Array.isArray(predicate)) return all(is(predicate[0]))

  // object literal, fallback to tracery
  if (is.Object(predicate)) return false;

  return K(false)
}


module.exports = is