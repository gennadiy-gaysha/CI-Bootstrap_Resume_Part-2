// These two code snippets are are functionally equivalent

// This code snippet uses the $.when() function to ensure
// that the AJAX request is completed before executing the .then()
// method. Within the .then() method, two callback functions are
// provided: one for success and one for failure.
$.when($.getJSON(`https://api.github.com/users/gennadiy-gaysha`)).then(
  function (response) {
    console.log(response);
  },
  function (errorResponse) {
    console.log(errorResponse);
  }
);

// This code snippet uses the .done() and .fail() methods of the $.getJSON()
// promise to handle the success and failure cases respectively.
$.getJSON(`https://api.github.com/users/gennadiy-gaysha`)
  // the done() method is used to specify the callback function to execute when the
  // $.getJSON() request successfully receives a response. The response object contains
  // the data returned from the API call, and it is logged to the console
  .done(function (response) {
    console.log(response);
  })
  // In this code, the fail() method is called on the promise object returned by $.getJSON().
  // The provided callback function is executed if an error occurs during the JSON data retrieval
  // process. The errorResponse parameter of the callback function contains the error information
  // or status related to the failed request, which is logged to the console using
  // console.log(errorResponse).
  .fail(function (errorResponse) {
    console.log(errorResponse);
  });
