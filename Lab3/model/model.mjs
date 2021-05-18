
export class Model {
    constructor(dbConnection) {
        this.db = dbConnection
    }
    addUser(data) {
        var self = this;
        return new Promise((resolve,reject) => {
            self.db.run('INSERT INTO users (login,password,email,sex,birth_date) VALUES (?,?,?,?,?)',[data.login,data.pass,data.email,data.sex,data.birthDate],(error) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(this.lastId)
                }
                
            })
        })
    }
    getUserByEmail(email) {
        var self = this;
        return new Promise((resolve,reject) => {
            self.db.get('SELECT * FROM users WHERE email = ?',[email],(error,row)=>{

                if(error) {
                    reject(error)
                } else {
                    console.log(row)
                    resolve(row)
                }
            })
        })
    }
    addLink(link,shortLink,userId) {
        var self = this;
        return new Promise((resolve,reject) => {
            self.db.run('INSERT INTO links (original_link,short_link,user_id) VALUES (?,?,?)',[link,shortLink,userId],(error) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(this.lastId)
                }
                
            })
        })
    }
    getUserLinks(userId) {
        var self = this;
        return new Promise((resolve,reject) => {
            self.db.all('SELECT * FROM links WHERE user_id = ?',[userId],(error,rows)=>{
                if(error) {
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    findOriginalLink(shortLink,userId) {
        var self = this;
        return new Promise((resolve,reject) => {
            self.db.get('SELECT short_link FROM links WHERE user_id = ? AND short_link = ?',[userId,shortLink],(error,row)=>{
                if(error) {
                    reject(error)
                } else {
                    resolve(row)
                }
            })
        })
    }
    updateLink(userId,link) {

    }
    removeLink(userId,originalLink) {
        this.db.run('DELETE FROM links WHERE user_id = ? AND original_link = ?',[userId,originalLink])
    }

}