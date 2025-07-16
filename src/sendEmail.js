(function () {
  emailjs.init("NP8blE3RXh-9IC6Ux"); 
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //get all the values of the form input fields
    const { sender, subject, school, message } = Object.fromEntries(new FormData(form).entries());

    //change receiver based on school
    const receiver = {
        "General Inquiry (Not School Specific)": "2025238@apps.nsd.org", //Yo-cheng
        "Canyon Creek Elementary School": "2002159@apps.nsd.org", //Videep
        "Fernwood Elementary School": "2025238@apps.nsd.org", 
        //ishita 2002469@apps.nsd.org
    }[school] || "2025238@apps.nsd.org";

    const cc = "";

    try {
        emailjs.send("service_pqhebck", "template_krpovpb", {
            sender: sender,
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


