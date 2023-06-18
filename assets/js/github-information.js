function fetchGitHubInformation(event) {
  // retrieves the value entered in an input field with the ID gh-username.
  // This value represents the GitHub username that the user wants to fetch
  // information about.
  let username = $("#gh-username").val();
  // If username is empty, it displays a message in the element with the ID gh-user-data
  // asking the user to enter a GitHub username, and then it returns, terminating
  // the function.
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }
  // If the username variable is not empty, it proceeds to display a loading spinner by
  // adding HTML code to the element with the ID gh-user-data. This code includes an image
  // tag referencing a loader.gif file.
  $("#gh-user-data").html(
    `<div id="loader">
  			<img src="assets/css/loader.gif" alt="loading..." />
     </div>`
  );

  // Promise: It makes an AJAX request to the GitHub API using the $.getJSON() function and
  // the provided GitHub username. The $.when() function is used to ensure that the request
  // completes before executing the next steps.
  $.when($.getJSON(`https://api.github.com/users/{username}`)).then(
    function (response) {
      let userData = response;

      // If the request is successful (status code 200), the response data is stored in the
      // userData variable. The function userInformationHtml(userData) is then called to generate
      // HTML code representing the user information.

      // The generated HTML code is added to the element with the ID gh-user-data, replacing the
      // loading spinner. The user's GitHub information is now displayed on the page.
      $("#gh-user-data").html(userInformationHtml(userData));
    },

    // If the request encounters an error, the error response is captured in the errorResponse
    // parameter of the error callback function. The code checks the status of the error response.
    function (errorResponse) {
      // If it is a "404" status (user not found), a corresponding message is displayed in the
      // gh-user-data element.
      if (errorResponse.status === "404") {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else {
        // Otherwise, the error message from the response is logged to the console, and an error
        // message is displayed in the gh-user-data element.
        console.log(errorResponse);
        $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
      }
    }
  );
}
