function userInformationHTML(user) {
  return `<h2>
  ${user.name}
  <span class="small-name"> (@<a href="${user.html_url}" target="_blank">${user.login}</a>) </span>
</h2>
<div class="gh-content">
  <div class="gh-avatar">
    <a href="${user.html_url}" target="_blank">
      <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
    </a>
  </div>
  <p>
    Followers: ${user.followers} - Following ${user.following} <br />
    Repos: ${user.public_repos}
  </p>
</div>`;
}

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
  const token =
    "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";
  // Promise: It makes an AJAX request to the GitHub API using the $.getJSON() function and
  // the provided GitHub username. The $.when() function is used to ensure that the request
  // completes before executing the next steps.

  // In this updated code, the $.ajax() function is used instead of $.getJSON() to have more control over
  // the headers. The headers are set within the headers property of the $.ajax() function, ensuring that
  // they are correctly included in the request.
  $.ajax({
    url: `https://api.github.com/users/${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }).then(
    function (response) {
      let userData = response;

      // If the request is successful (status code 200), the response data is stored in the
      // userData variable. The function userInformationHtml(userData) is then called to generate
      // HTML code representing the user information.

      // The generated HTML code is added to the element with the ID gh-user-data, replacing the
      // loading spinner. The user's GitHub information is now displayed on the page.
      $("#gh-user-data").html(userInformationHTML(userData));
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
