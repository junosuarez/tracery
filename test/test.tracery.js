var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

describe('tracery', function () {
  var tracery = require('../index')

  it('has interface', function () {
    tracery.should.be.a('function')
    tracery.Collection.should.be.a('function')
  })

  it('returns a predicate asserting that an object matches a structure defined by builtins', function () {
    var p = tracery({
      a: String,
      b: Number,
      c: Boolean,
      d: Function,
      e: Object,
      f: Array
    })

    var obj = {
      a: 'tofu',
      b: 108,
      c: true,
      d: function () {},
      e: {},
      f: []
    }

    p(obj).should.equal(true)

    var obj2 = {
      a: false,
      b: obj2,
      c: 12
    }

    p(obj).should.equal(false)
  })

  it('can match properties by predicate', function () {
    var isUpperCase = /^[A-Z]*$/.test
    var p = tracery({
      b: isUpperCase
    })

    p({
      b: 'BAR'
    }).should.equal(true)


    p({
      b: 'Bar'
    }).should.equal(false)

  })

})