const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const db = require('./models')
const MeetingRoute = require('./routes/meeting.routs')
const app = express()
const corsOptions = {
// origin: 'https://mejabulat23.onrender.com',
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
db.mongoose.set('strictQuery', false)
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // strictQuery: false
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

// simple route
app.get('/', (req, res) => {
  // res.json({ message: 'Welcome to iDeras alerts API application.' });
  res.json('Welcome to Mejabulat API V.2 application. *events/create *events/all *events/id[get/update/delete]')
})

// app.all('*', (req, res) =>res.send('You've tried reaching a route that doesn't exist.'));

app.use('/events/', MeetingRoute)
// app.use('/api/alert', alertRoute)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
