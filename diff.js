var is = require('./is')

function diff(Interface, doc) {

  var d = {}
  var same = true

  for (var prop in Interface) {
    var actual = doc[prop]
    var expected = Interface[prop]
    var test = is(expected)
    if (!test) {
      // expecting an object

      if (!actual) {
        // and it's mising
        same = false
        d[prop] = {actual: toString(actual), expected: toString(expected), actualValue: actual}
      } else {
        // it's an object, recurse      
        var dd = diff(expected, actual)
        if (dd) {
          same = false
          d[prop] = dd
        }
      }

    } else if (!is(expected)(actual)) {
      same = false
      d[prop] = {actual: toString(actual), expected: toString(expected), actualValue: actual}
    }
  }

  return same ? false : d

}

function toString(type) {

  // null
  if (is.Null(type)) { return 'Null' }

  var t = typeof type;
  // builtin functions and custom pattern predicates
  if (t === 'function') {
    return type.name || 'Custom Function'
  }

  // value types
  if (t !== 'object') return t[0].toUpperCase() + t.substring(1)

  // typed arrays
  if (Array.isArray(type)) {
    var t0 = toString(type[0])
    if (type.every(function(ele) { return toString(ele) === t0 })) {
      return 'Array<' + t0 + '>'
    } else {
      return 'Array'
    }

  }

  // otherwise
  return Object.prototype.toString(type).replace(/[\[\]]/g,'')
}

module.exports = diff