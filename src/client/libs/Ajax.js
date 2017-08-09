"use strict"

class Ajax {
  handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }

  get(url) {
    return fetch(url, {
      type: 'GET',
      accept: 'application/json',
      credentials: 'include'
    }).then(this.handleResponse);
  }

  delete(url) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(this.handleResponse);
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
    }).then(this.handleResponse);
  }

  post(url, data) {
    return fetch(url, {
      method: "POST",
      credentials: 'include',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(this.handleResponse);
  }
}

export default new Ajax();
