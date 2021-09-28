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
            //handle empty case
        } else{
            //handle proper case
        }

        if(field.id === "user_email"){
            //handle email
            field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid email address."
        }

        if(field.id === "user_phone"){
            //handle phone
            field.parentElement.querySelector('.error-message').innerHTML = "Please enter a valid phone."
        }
    }
}