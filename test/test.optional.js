var chai = require('chai')
chai.should()

describe('tracery.Optional', function () {
  var Optional = require('../index').Optional

  it('returns a combined predicate which is true if the given predicate is true or the subject is undefined', function () {
    var Me = function (x) { return x === 'jden'}
    var opt = Optional(Me)

    opt('jden').should.equal(true)
    opt().should.equal(true)
    opt('blah').should.equal(false)
  })
})

describe('tracery.Nullable', function () {
  var Nullable = require('../index').Nullable

  it('returns a combined predicate which is true if the given predicate is true or the subject is null', function () {
    var Me = function (x) { return x === 'jden'}
    var opt = Nullable(Me)
    opt('jden').should.equal(true)
    opt(null).should.equal(true)
    opt('blah').should.equal(false)
  })
})
