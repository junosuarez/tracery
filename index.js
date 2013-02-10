var connective = require('connective')
var is = require('./is')

function tracery (structure) {
  if (Array.isArray(structure)) {
    return is(structure)
  }

  return function (obj) {
    for (var key in structure) {
      var type = structure[key]
      var test = is(type) || tracery(type)
      var prop = obj[key]
      if (!test(prop)) {
        return false
      }
    }
    return true
  }
}

function Optional (type) {
  return connective.or(is(type), is.Undefined)
}

function Nullable (type) {
  return connective.or(is(type), is.Null)
}

function Vector (structure) {
  var predicates = structure.map(is)
  var len = structure.length;
  return function (arr) {
    if (!Array.isArray(arr)) return false
    if (arr.length !== len) return false
    for(var i = 0; i < len; i++) {
      var ele = arr[i]
      if (!predicates[i](ele)) return false
    }
    return true
  }
}

module.exports = tracery
module.exports.Collection = require('./collection')
module.exports.Optional = Optional
module.exports.Nullable = Nullable
module.exports.Vector = Vector

