class Ajax {

  public get(url: string) {
    return fetch(url, {
      credentials: "include",
      headers: {
        accept: "application/json"
      },
      method: "GET"
    }).then(this.handleResponse);
  }

  public delete(url) {
    return fetch(url, {
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(this.handleResponse);
  }

  public put(url: string, data = null) {
    return fetch(url, {
      body: data ? JSON.stringify(data) : null,
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT"
    }).then(this.handleResponse);
  }

  public post(url: string, data) {
    return fetch(url, {
      body: data ? JSON.stringify(data) : null,
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(this.handleResponse);
  }

  private handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }
}

export default new Ajax();
