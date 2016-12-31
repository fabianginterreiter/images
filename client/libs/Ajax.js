class Ajax {
  get(url) {
    return fetch(url, {
      type: 'GET',
      accept: 'application/json',
      credentials: 'include'
    }).then(function(response) {
      return response.json();
    });
  }

  delete(url) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  }

  put(url) {
    return fetch(url, {
      method: "PUT",
      credentials: 'include'
    });
  }
}

module.exports = new Ajax();