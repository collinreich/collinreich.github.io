class FormValidator{
    constructor(form, fields){
        this.form = form;
        this.fields = fields;
        this.formData = {
            user_fname: "",
            user_lname: "",
            user_email: "",
            user_phone: "",
            user_message: "",
        };
    }

    validateOnSubmit(){
        let self = this
        console.log(self)
        console.log(self.form)
        console.log(self.fields)
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            let isFormValidFlag = true
            console.log("flag is now true")
            self.fields.forEach(field => {
                let input = document.getElementById(field.toString())
                if(!self.validateFields(input)){
                    console.log("flag is now false because", input.id, "is invalid")
                    isFormValidFlag = false
                }else{
                    console.log(self.formData)
                    self.extractFormData(input)
                    console.log(self.formData)
                }
            })
            if(isFormValidFlag){
                console.log("going to send form because flag was never set to false")
                emailjs.send('contact_service_id', 'contact_form', self.formData) //need to find what will replace 'this'
                    .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            }
        })
    }

    validateFields(field){
        if(field.value.trim() === ""){
            field.parentElement.querySelector('.error-message').innerHTML = "Please do not leave anything blank"
            field.style.borderColor = "red"
            return false
        } else{
            field.parentElement.querySelector('.error-message').innerHTML = ""
            field.style.borderColor = "black"
        }

        if(field.id === "user_email"){
            let emailRegEx = /\S+@\S+\.\S+/
            if(!emailRegEx.test(field.value)){
                field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid email address"
                field.style.borderColor = "red"
                return false
            }
        }

        if(field.id === "user_phone"){
            let phoneRegEx = /\d{3}-\d{3}-\d{4}/
            if(!phoneRegEx.test(field.value)){
                field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid phone number in the format: xxx-xxx-xxxx"
                field.style.borderColor = "red"
                return false
            }
        }
        return true
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

    extractFormData(field){
        switch(field.id){
            case "user_fname":
                this.formData.user_fname = field.value
                break;
            case "user_lname":
                this.formData.user_lname = field.value
                break;
            case "user_email":
                this.formData.user_email = field.value
                break;
            case "user_phone":
                this.formData.user_phone = field.value
                break;
            case "user_message":
                this.formData.user_message = field.value
                break;
            default:
                break;
        }
    }
}

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