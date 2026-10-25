const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const studentRoutes = require('./routes/studentRoutes')
const eventRoutes = require('./routes/eventRoutes')
const registrationRoutes =
  require('./routes/registrationRoutes')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/students', studentRoutes)
app.use('/api/events', eventRoutes)
app.use(
  '/api/registrations',
  registrationRoutes
)
app.get('/', (req, res) => {
  res.json({
    message: 'CampusFlow backend is running 🚀'
  })
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✅')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error.message)
  })