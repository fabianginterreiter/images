class Ajax {
  get(url) {
    return fetch(url, {
      type: 'GET',
      accept: 'application/json',
      credentials: 'include'
    }).then(function(response) {
      if (response.ok) {
        return response.json();  
      } else {
        return null;
      }
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

  put(url, data) {
    return fetch(url, {
      method: "PUT",
      credentials: 'include',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((result) => result.json());
  }
}

module.exports = new Ajax();