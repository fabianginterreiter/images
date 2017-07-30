module.exports = {
  find:function(list, id) {
    for (var index = 0; index < list.length; index++) {
      if (list[index].id === id) {
        return list[index];
      }
    }

    return null;
  }
}