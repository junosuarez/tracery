# tracery
an object structure predicate builder (make functions to test an object's structure)

Easily build functions to test properties of objects - useful for validation, verifying data integrity, and application-level schema checking.

Fun fact: tracery ["is the stonework elements that support the glass in a Gothic window."](http://en.wikipedia.org/wiki/Tracery)

## usage

Define a structure with an object mapping between property names and types. Types can be either JavaScript builtins or predicate (boolean-returning) functions - even another `tracery` function, for easy composition. This is very powerful and lets your describe very complex document structures easily.

```js
    var tracery = require('tracery')
    var Tags = tracery([String])

    var Movie = tracery({
      title: String,
      director: String,
      year: Number,
      genre: String,
      tags: Tags
    })

    var Flavor = tracery({
      sour: Boolean,
      bitter: Boolean,
      sweet: Boolean,
      spicy: Boolean
    })

    var Document = tracery({
      id: String,
      movies: [Movie],
      flavors: tracery.Collection(Flavor)
    })

    var goodDoc = {
      id: 'doc123',
      movies: [{title: 'Born to be born', director: 'Ken Bobson', year: 1982, genre: 'Action', tags: ['cheesy']}],
      flavors: {
        'butter popcorn': {sour: false, bitter: false, sweet: false, spicy: false},
        'wasabi': {sour: false, bitter: false, sweet: false, spicy: true},
        'sweet and sour shrimp': {sour: true, bitter: false, sweet: true, spicy: false}
      }
    }

    Document(goodDoc)
    // => true

```

### combined types

Using higher order functions (for example, with [connective](https://github.com/AgileDiagnosis/node-connective)), you can combine predicates to effectively "mix in" multiple document types:

```js
    var and = require('connective').and

    var Person = tracery({
      name: String
    })

    var Employee = and(Person, tracery({
      salary: Number,
      reportsTo: Person
    }))
```

### `Optional` and `Nullable` types

Let's say not every employee has a supervisor. `tracery` has builtin helpers `tracery.Optional` (which can be the value or `undefined`) and `tracery.Nullable` (which can be the value or `null`):

```js
    var Employee = and(Person, tracery({
      salary: Number,
      reportsTo: tracery.Nullable(Person)
    }))

    Employee({
      name: 'bob',
      salary: 10,
      reportsTo: null
    })
    // => true
```

Sometimes, you want to assert that an object property is exactly the value `null`. The `null` builtin type matches exactly the value `null`:

```js
var Empty = tracery({
  value: null
})

Empty({
  value: null
})
// => true
```

### `Collection`s

Sometimes documents have variable property names, but you'd still like to check that the property values have a specific structure (for example, when using an object as a dictionary or hash table). We can use `tracery.Collection`:

```js
    var State = tracery({
      capital: String,
      counties: tracery.Collection({seat: String, population: Number})
    })

    var California = {
      capital: 'Sacramento',
      counties: {
        // thanks wikipedia
        'Alameda': {seat: 'Oakland', population: 1510271},
        'Alpine': {seat: 'Markleeville', population: 1175}
      }
    }

    State(California)
    // => true
```

A Collection assumes keys are strings (like JavaScript objects).

### typed arrays

We can specify that a property should be an array with any number of elements, all of a given type like so:

```js
    var Likes = tracery({
      movies: [Movie],
      songs: [Song]
    })
```
Empty arrays will match, but sparse arrays will not. In the case that you really need them:

```js
    var SparseLikes = tracery({
      movies: [tracery.Optional(Movie)]
    })
```

### no no, I meant builtin type arrays
oh! Well that's great: we support the following builtin types:

```js
    tracery({
      a: ArrayBuffer,
      b: DataView,
      c: Float32Array,
      d: Float64Array,
      e: Int8Array,
      f: Int16Array,
      g: Int32Array,
      h: Uint8Array,
      i: Uint16Array,
      j: Uint32Array,
      k: Date,
      l: RegExp
    })
```

### `Vector` typed vectors (tuples)

Arrays with an expected structure are sometimes used for memory or performance reasons to reprent vectors or tuples. For example, a Cartesian coordinate (10, 20) could be represented as an object as `{x: 10, y: 20}` or as `[10, 20]`. We can specify vectors, which must match in terms of number of elements and type of element at each position, using `tracery.Vector`:

```js
    var Point = tracery.Vector([Number, Number])

    var Square = tracery.Vector([Point, Point, Point, Point])

    var Circle = tracery({
      origin: Point,
      radius: Number
    })
````

### InstanceOf

There's a shortcut for making a predicate to assert `instanceof`:

```js
    var Foo = function () {}

    var foo = new Foo()

    var isFoo = tracery.InstanceOf(Foo)

    isFoo(foo)
    // => true
```

See `test/example.js` for more.

## bonus: type diffing

You can `require('tracery/diff')` to generate objects diffing betweed expected and actual object structures. If there is no difference, it returns false, otherwise it returns an object structure similar to the object under test, with leaves of `{actual: type, expected: type, actualValue: value}`.

This module is included in the package, but is not loaded by default. It is useful for debugging and for unit tests.

See `test/test.diff` for a readable example.

## installation

    $ npm install tracery

## running the tests

    $ npm install
    $ npm test

## changelog
0.5.0 - add support for builtin typed arrays, Date, and RegExp objects in type signatures
0.4.0 - intial public release

## contributors

jden <jason@denizac.org>
Zalastax <kpierre@outlook.com>

please submit pull requests or issues

## license

MIT (c) 2015 Jason Denizac. See LICENSE.md