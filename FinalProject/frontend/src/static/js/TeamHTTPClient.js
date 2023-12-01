var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "929d82020297d246d0b2234faa3df3e8");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions =  {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const handleError = (res) => {
    if (!res.ok) {
      let error = new Error(res.statusText);
      error.status = res.status;
      throw error;
    }
    return res;
  };

export default {
    get: (url) => {
        return fetch(url, requestOptions)
        .then(handleError)
        .then((res) => {
            return res.json();
        });
    }
}