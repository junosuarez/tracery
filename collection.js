function Collection (predicate) {
  return function (obj) {
    for(var key in obj) {
      if (!predicate(obj[key])) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Collection