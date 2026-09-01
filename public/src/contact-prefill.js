function prefillContactFormFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    const message = params.get("message");

    if (subject) {
        const subjectInput = document.getElementById("subject");
        if (subjectInput) subjectInput.value = subject;
    }

    if (message) {
        const messageInput = document.getElementById("message");
        if (messageInput) messageInput.value = message;
    }
}
