class HTTPClient {
  static get(url) {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("error in request");
      }
      return res.json();
    });
  }
}
