export class Controller {
    constructor() {

    }

    login(email,password,context) {
        if(email === 'anpaschenko@gmail.com' && password === '123') {
            context.session.userName = 'Anton'
        }
        context.response.redirect('/')
    }

    register(registration_data,context) {
        console.log(registration_data)
    }
}