var chai = require('chai')
chai.should()

describe('tracery.InstanceOf', function () {
  var InstanceOf = require('../index').InstanceOf

  it('makes predicates which assert object is an instance of a constructor', function () {
    var Foo = function () {}

    var foo = new Foo()

    var isFoo = InstanceOf(Foo)

    isFoo(foo).should.equal(true)
    isFoo({}).should.equal(false)
    isFoo().should.equal(false)

  })
})