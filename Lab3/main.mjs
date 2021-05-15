import express from 'express';
import session from 'express-session'
import sqlite3 from 'sqlite3'
import { Controller } from './controller/controller.mjs';
import { Model } from './model/model.mjs'

const app = express()
const port = 3000

const connection = new sqlite3.Database('./db/app.db',sqlite3.OPEN_READWRITE,(err) => {
  if(err) {
    console.log(err)
  }
})
const model = new Model(connection)
const controller = new Controller()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))  

app.get('/', (req, res) => {
    res.render('pages/index',{userName : req.session.userName})
    //res.sendFile(path.join(htmlPath, '/index.html'))
})
app.get('/login', (req, res) => {
  res.render('pages/login')
  //res.sendFile(path.join(htmlPath, '/login.html'))
})
app.get('/about', (req, res) => {
  res.render('pages/about',{userName : req.session.userName})
  //res.sendFile(path.join(htmlPath, '/about.html'))
})
app.get('/register', (req, res) => {
  res.render('pages/register')
  //res.sendFile(path.join(htmlPath, '/register.html'))
})
app.get('/userPage', (req, res) => {
  res.render('pages/user_page',{userName : req.session.userName})
  //res.sendFile(path.join(htmlPath, '/user_page.html'))
})
app.get('/logOut',(req,res) => {
  req.session.userName = undefined
  req.session.userId = undefined
  res.redirect('/')
})

app.post('/login', (req, res) => {
  controller.login(req.body.email,req.body.pass,{response:res,session : req.session})
})
app.post('/register',(req,res) => {
  controller.register(req.body,{response:res,session : req.session})
})
app.get('*',(req,res) => {
  res.status(404).send('wtf')
})
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})