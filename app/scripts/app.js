

(function(document) {
  'use strict'; 

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} response - The unparsed JSON response from get.
   */
  function addSearchHeader(response) {
    try {
      response = JSON.parse(response).query;  // you'll be moving this line out of here in the next quiz!
    } catch (e) {
      // it's 'unknown', so leave it alone
    }
    home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
      return fetch(url);
  }

  function getJSON(url) {
    /* return a Promise that gets a URL and parses the JSON response. Use the get method! */
    return get(url).then(function(response) {
      return response.json();
    })
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line you're ready to start chaining and testing!
    You'll need to add a .then and a .catch. Pass the response to addSearchHeader on resolve or
    pass 'unknown' to addSearchHeader if it rejects.
     */
    getJSON('../data/earth-like-results.json')
        .then((response) => {
            addSearchHeader(response.query);
            console.log(response);
            return response.results[1];
        })
        .then(response => console.log(response))
        .catch((error) => {
            addSearchHeader(error);
            console.log(error);
        })
  });
})(document);
