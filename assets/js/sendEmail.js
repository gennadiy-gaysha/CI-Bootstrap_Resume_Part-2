function sendMail(contactForm) {
  let templateParams = {
    from_name: contactForm.name.value,
    from_email: contactForm.emailaddress.value,
    project_request: contactForm.projectsummary.value,
  };

  emailjs.send("service_si3bblb", "template_e5ii68e", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response); //response.status, response.text
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
  return false; // To block from loading a new page
}
