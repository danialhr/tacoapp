var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var ejsLayouts = require('express-ejs-layouts')
var mongoose = require('mongoose')
var path = require('path')
var dotEnv = require('dotenv')
var app = express()

dotEnv.config({ silent: true })
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mydbname')

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/tacos', require('./controllers/tacos_controller'))

var server = app.listen(process.env.PORT || 3000)
console.log('Server Listing')

module.exports = server
