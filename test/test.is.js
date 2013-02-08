var chai = require('chai')
chai.should()

describe('tracery.isTypeof', function() {
  var isTypeof = require('../index').isTypeof
  it('builds a predicate testing typeof its argument', function () {
    var isStr = isTypeof('string')
    isStr('foo').should.equal(true)
    isStr(234).should.equal(false)
  })
})

describe('tracery.is', function () {
  var is = require('../index').is

  it('returns a RegEx test function which can be called on any value if called with a RegEx', function () {
    var fn = is(/foo/)
    fn('foo').should.equal(true)
    fn().should.equal(false)
    fn(213).should.equal(false)
  })

  it('returns K(false) if called on something other than a predicate or a builtin', function () {
    is()().should.equal(false)
    is(null)().should.equal(false)
    is('foo')().should.equal(false)
    is(12)().should.equal(false)
    is(/huh?/)().should.equal(false)
  })

  it('passes predicates straight through if called on a function', function () {
    var isImpossible = function (x) { return x > 9000 }
    var I = is(isImpossible)

    I.should.equal(isImpossible)

    I(10).should.equal(isImpossible(10))
    I(10000).should.equal(isImpossible(10000))
  })

  describe('builds predicates matching typeof from builtins', function () {

    it('Boolean', function () {
      var isBool = is(Boolean)

      isBool(true).should.equal(true)
      isBool(false).should.equal(true)
      isBool('unicorns').should.equal(false)
    })

    it('Number', function () {
      var isNum = is(Number)

      isNum(2).should.equal(true)
      isNum(0x13).should.equal(true)
      isNum('ten').should.equal(false)
      isNum().should.equal(false)
      isNum(NaN).should.equal(false) // because let's be real, JavaScript
      isNum(Infinity).should.equal(true)
      isNum(-Infinity).should.equal(true)
    })

    it('String', function () {
      var isStr = is(String)

      isStr('').should.equal(true)
      isStr('sdfsdf').should.equal(true)
      isStr().should.equal(false)
      isStr({}).should.equal(false)
      isStr(null).should.equal(false)
    })

    it('Array', function () {
      var isArr = is(Array)

      isArr([]).should.equal(true)
      isArr(arguments).should.equal(false)
      isArr(null).should.equal(false)
      isArr(23).should.equal(false)
      isArr('Shanghai').should.equal(false)
    })

    it('Object', function () {
      var isObj = is(Object)

      isObj({}).should.equal(true)
      isObj('coffee').should.equal(false)
      isObj().should.equal(false)
    })

    it('Function', function () {
      var isFn = is(Function)

      isFn(function (){}).should.equal(true)
      isFn(isFn).should.equal(true)
      isFn(void 0).should.equal(false)
      isFn('not a function').should.equal(false)
    })

  })


})