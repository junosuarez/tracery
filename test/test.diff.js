var chai = require('chai')
chai.should()

describe('tracery/diff', function () {
  var diff = require('../diff')

  it('returns an object highlighting exceptions', function () {
    var OK = function () { return false }
    OK.name = OK

    var Interface = {
      a: Number,
      b: Number,
      c: RegExp,
      d: {
        q: Number,
        w: Date
      },
      e: OK,
      f: [String],
      g: [Number]
    }

    var doc = {
      a: 12,
      c: "hello",
      d: {
        w: new Date
      },
      e: 'foo',
      f: [1,2,3],
      g: [1, 'two']
    }

    var expectedDiff = {
        b: {
        actual: 'Undefined',
        expected: 'Number',
        actualValue: undefined
      },
      c: {
        actual: 'String',
        expected: 'RegExp',
        actualValue: 'hello'
      },
      d: {
        q: {
          actual: 'Undefined',
          expected: 'Number',
          actualValue: undefined
        }
      },
      e: {
        actual: 'String',
        expected: 'Custom Function',
        actualValue: 'foo'
      },
      f: {
        actual: 'Array<Number>',
        expected: 'Array<String>',
        actualValue: [1, 2, 3]
      },
      g: {
        actual: 'Array',
        expected: 'Array<Number>',
        actualValue: [1, 'two']
      }
    }

    diff(Interface, doc).should.deep.equal(expectedDiff)

  })
})