var tracery = require('../index')

var Document = tracery({
  id: String,
  movies: [Movie],
  flavors: tracery.Collection(Flavor)
})

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
  spicy: Boolean,
  salty: Boolean
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

Document(goodDoc)
// => true

Document(badDoc)
// => false