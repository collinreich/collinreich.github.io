class FormValidator{
    constructor(form, fields){
        this.form = form;
        this.fields = fields;
    }

    validateOnSubmit(){
        let self = this
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            self.fields.forEach(field => {
                let input = document.getElementById(field.toString())
                self.validateFields(input)
            })
        })
    }

    validateFields(field){
        if(field.value.trim() === ""){
            field.parentElement.querySelector('.error-message').innerHTML = "Please do not leave anything blank"
            field.style.borderColor = "red"
        } else{
            field.parentElement.querySelector('.error-message').innerHTML = ""
            field.style.borderColor = "black"
        }

        if(field.id === "user_email"){
            let emailRegEx = /\S+@\S+\.\S+/
            if(!emailRegEx.test(field.value)){
                field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid email address"
                field.style.borderColor = "red"
            }
        }

        if(field.id === "user_phone"){
            let phoneRegEx = /\d{3}-\d{3}-\d{4}/
            if(!phoneRegEx.test(field.value)){
                field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid phone number in the format: xxx-xxx-xxxx"
                field.style.borderColor = "red"
            }
        }
    }

    defaultOnInput(){
        let self = this
        self.fields.forEach(field => {
            let input = document.getElementById(field.toString())
            input.addEventListener('input', event => {
                event.preventDefault()
                self.defaultFields(input)
            })
        })
    }

    defaultFields(field){
        field.style.borderColor = "black"
        field.parentElement.querySelector('.error-message').innerHTML = ""
    }
}
// let validateFormOnSubmit = (event) => {
//     event.preventDefault();
//     let user_fname = document.getElementById("user_fname").value;
//     let user_lname = document.getElementById("user_lname").value;
//     let user_email = document.getElementById("user_email").value;
//     let user_phone = document.getElementById("user_phone").value;
//     let user_message = document.getElementById("user_message").value;
//     // console.log("submit has been hit");
//     console.log(user_fname);
//     console.log(user_lname);
//     console.log(user_email);
//     console.log(user_phone);
//     console.log(user_message);
// };

// let validateForm = (user_fname, user_lname, user_email, user_phone, user_message) => {

// }

//main driver function
let main = () => {
    let contactForm = document.getElementById("contact-form");
    let contactFields = ["user_fname", "user_lname", "user_email", "user_phone", "user_message"];
    // contactForm.addEventListener("submit", validateFormOnSubmit);
    const validator = new FormValidator(contactForm, contactFields);
    validator.validateOnSubmit();
    validator.defaultOnInput();
}

//only call driver when the DOM is ready
window.onload = () => {
    main();
}