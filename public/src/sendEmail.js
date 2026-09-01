(function () {
  emailjs.init("NP8blE3RXh-9IC6Ux"); 
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const { email, subject, school, message } = Object.fromEntries(new FormData(form).entries());

    const defaultEmail = typeof DEFAULT_CONTACT_EMAIL !== "undefined"
        ? DEFAULT_CONTACT_EMAIL
        : "2025238@apps.nsd.org";
    const receiver = (typeof CHAPTERS !== "undefined" ? CHAPTERS : [])
        .find((chapter) => `${chapter.school} School` === school)?.contactEmail ?? defaultEmail;

    const cc = "";

    try {
        emailjs.send("service_pqhebck", "template_krpovpb", {
            sender: email,
            subject: subject,
            school: school,
            message: message,
            receiver: receiver,
            cc: cc
        })
        alert("Email sent successfully!");
        form.reset();
    } catch (error) {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again later.");
    }

    
  });

});

