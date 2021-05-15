import sqlite3 from 'sqlite3'
import fs from 'fs'

sqlite3.verbose()
fs.unlink('db/app.db',(err)=> {})

const db = new sqlite3.Database('./db/app.db')

db.run(`CREATE TABLE users (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            login VARCHAR(20),
                            password VARCHAR(30),
                            email VARCHAR(20) UNIQUE,
                            sex VARCHAR(20),
                            birth_date VARCHAR(30));`)

db.run(`CREATE TABLE links (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            original_link VARCHAR(255),
                            short_link VARCHAR(255) UNIQUE,
                            user_id INT,
                            FOREIGN KEY(user_id) REFERENCES users(id));`)
db.close()
/*
CREATE TABLE links (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            original_link VARCHAR(255),
                            short_link VARCHAR(255) UNIQUE,
				   			user_id INT,
				   			FOREIGN KEY(user_id) REFERENCES users(id));
*/