import cryptoRandomString from 'crypto-random-string';

export class Controller {
    constructor(model) {
        this.model = model
    }
    async login(email,password,context) {
        try {
            let result = await this.model.getUserByEmail(email)
            if(result.password === password) {
                context.session.userName = result.login
                context.session.userId = result.id
                context.response.redirect('/')
                console.log('successful login' + result.id)
            } else {
                context.response.redirect('/login')
            }
        } catch (error) {
            context.response.redirect('/login')
        }
    }
    signIn(id,data,session) {
        session.userId = id;
        session.userData = data
    }

    async register(registration_data,context) {
        try {
            let id = await this.model.addUser(registration_data)
            context.session.userName = registration_data.login
            context.session.userId = id
            context.response.redirect('/')
            console.log('successful registration')
        } catch (error) {
            context.response.redirect('/register')
        }
    }
    async addLink(link,context) {
        try {
            let short = cryptoRandomString({length: 10, type: 'url-safe'});
            await this.model.addLink(link,short,context.session.userId)
            context.response.status(200)
        } catch (error) {
            console.log('error')
        }
    }
}