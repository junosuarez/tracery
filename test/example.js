var tracery = require('../index')
var should = require('chai').should()

describe('example:', function () {
  it('can nest tracery objects', function () {

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

    var badDoc = {
      id: 324,
      movies: [{title: 'Born to be born', director: 'Ken Bobson', year: 1982, genre: 'Action', tags: ['cheesy']}],
      flavors: {
        'butter popcorn': {sour: false, bitter: false, sweet: false, spicy: false},
        'wasabi': {sour: false, bitter: false, sweet: false, spicy: true},
        'sweet and sour shrimp': {sour: true, bitter: false, sweet: true, spicy: false}
      }
    }

    Document(goodDoc).should.equal(true)
    Document(badDoc).should.equal(false)

  })
})




//console.log(Document(goodDoc))
//Document(badDoc).should.equal(false)
// => false
//console.log(Document(badDoc))