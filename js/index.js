let resumeClickHandler = () => {
    window.open('/resources/resume.pdf', '_blank', 'fullscreen=yes');
    return false;
}

//main driver function
let main = () => {
    let contactForm = document.getElementById("contact-form");
    let contactFields = ["user_fname", "user_lname", "user_email", "user_phone", "user_message"];
    document.getElementById("resume-visual").onclick = resumeClickHandler;
    const validator = new FormValidator(contactForm, contactFields);
    validator.validateOnSubmit();
    validator.defaultOnInput();
}

//only call driver when the DOM is ready
window.onload = () => {
    console.log('WINDOW IS LOADED')
    main();
}