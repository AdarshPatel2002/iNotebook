const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')

const app = express()

connectToMongo()
app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))

app.listen(5000)