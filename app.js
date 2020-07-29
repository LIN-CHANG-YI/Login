const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const userCheck = require('./userCheck')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const userName = userCheck(req.body)
  if (userName) {
    res.render('loginPass', { userName })
  } else {
    const alert = `Email or Password error!`
    res.render('index', { alert, email, password })
  }
})

app.listen(3000, () => {
  console.log('Express is listen on port 3000!')
})