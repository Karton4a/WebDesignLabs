const express = require('express')
const path = require('path');
const session = require('express-session')
const app = express()
const port = 3000
const htmlPath = path.join(__dirname, '/html')

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
    res.render('pages/index')
    //res.sendFile(path.join(htmlPath, '/index.html'))
})
app.get('/login', (req, res) => {
  res.render('pages/login')
  //res.sendFile(path.join(htmlPath, '/login.html'))
})
app.get('/about', (req, res) => {
  res.render('pages/about')
  //res.sendFile(path.join(htmlPath, '/about.html'))
})
app.get('/register', (req, res) => {
  res.render('pages/register')
  //res.sendFile(path.join(htmlPath, '/register.html'))
})
app.get('/userPage', (req, res) => {
  res.render('pages/user_page')
  //res.sendFile(path.join(htmlPath, '/user_page.html'))
})

app.post('/login', (req, res) => {
  res.sendStatus(200)
  //res.sendFile(path.join(htmlPath, '/user_page.html'))
})
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})