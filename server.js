if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// Router
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Connected to Mongoose!'))

// Router
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3005, () => console.log('Server Started!'))
