var chai = require('chai')
chai.should()

describe('tracery/is', function () {
  var is = require('../is')

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

    it('null', function () {
      var isNull = is(null)

      isNull(null).should.equal(true)
      isNull(undefined).should.equal(false)
      isNull(false).should.equal(false)
      isNull(0).should.equal(false)
      isNull('').should.equal(false)
    })

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

    it('Date', function () {
      var isDate = is(Date)

      isDate(new Date).should.equal(true)
      isDate().should.equal(false)
      isDate(123).should.equal(false)
    })
    it('RegExp', function () {
      var test = is(RegExp)

      test(/sdsf/).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })

    it('DataView', function () {
      var p = is(DataView)

      p(new DataView(new ArrayBuffer(16))).should.equal(true)
      p().should.equal(false)
      p(123).should.equal(false)
    })
    it('ArrayBuffer', function () {
      var test = is(ArrayBuffer)

      test(new ArrayBuffer(16)).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Float32Array', function () {
      var test = is(Float32Array)

      test(new Float32Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Float32Array', function () {
      var test = is(Float32Array)

      test(new Float32Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Float64Array', function () {
      var test = is(Float64Array)

      test(new Float64Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Int8Array', function () {
      var test = is(Int8Array)

      test(new Int8Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Int16Array', function () {
      var test = is(Int16Array)

      test(new Int16Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('In32Array', function () {
      var test = is(Int32Array)

      test(new Int32Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Uint8Array', function () {
      var test = is(Uint8Array)

      test(new Uint8Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Uint16Array', function () {
      var test = is(Uint16Array)

      test(new Uint16Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
    it('Uint32Array', function () {
      var test = is(Uint32Array)

      test(new Uint32Array()).should.equal(true)
      test().should.equal(false)
      test(123).should.equal(false)
    })
  })


})