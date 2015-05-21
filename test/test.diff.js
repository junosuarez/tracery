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
        w: Date,
        x: {
          A: Number,
          B: null
        }
      },
      e: OK,
      f: [String],
      g: [Number],
      h: null,
      i: null
    }

    var doc = {
      a: 12,
      c: "hello",
      d: {
        w: new Date
      },
      e: 'foo',
      f: [1,2,3],
      g: [1, 'two'],
      h: null,
      i: undefined
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
        },
        x: {
          actual: 'Undefined',
          expected: "object Object",
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
      },
      i: {
        actual: 'Undefined',
        expected: 'Null',
        actualValue: undefined
      }
    }

    diff(Interface, doc).should.deep.equal(expectedDiff)

  })
})