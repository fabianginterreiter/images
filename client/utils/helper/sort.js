"use strict"

module.exports = function(list, name, asc) {
  return new Promise(function(resolve, reject) {
    var result = list.sort((a,b) => {
      if (a[name] < b[name]) {
        return asc ? -1 : 1;
      } else if (a[name] > b[name]) {
        return asc ? 1 : -1;
      }
      return 0;
    });
    resolve(result);
  })
}
