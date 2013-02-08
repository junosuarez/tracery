var chai = require('chai')
chai.should()

describe('tracery.Vector', function () {
  var Vector = require('../index').Vector

  it('makes predicates which assert an array with specified length and element types', function () {
    var isPoint = Vector([Number, Number])

    isPoint([1, 2]).should.equal(true)

    isPoint([1, 2, 3]).should.equal(false)

    isPoint([1]).should.equal(false)

    isPoint([]).should.equal(false)

    isPoint(1, 2).should.equal(false)

    isPoint({'0': 1, '1': 2, length: 2}).should.equal(false)
  })
})