var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

describe('tracery.Collection', function () {
  var Collection = require('../collection')

  it('takes a predicate A and returns a new predicate which takes an object and asserts A for each property of that object', function () {
    var isOdd = function (x) { return x % 2 === 1 }
    var c = Collection(isOdd)

    c.should.be.a('function')

    c({a: 1, b: 2, c: 3}).should.equal(false)
    c({a: 1, b: 3, c: 5}).should.equal(true)
  })

})