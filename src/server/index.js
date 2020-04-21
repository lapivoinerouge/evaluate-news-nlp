//dotenv
const dotenv = require('dotenv');
dotenv.config();

//express
var path = require('path')
const express = require('express')
const app = express()

const mockAPIResponse = require('./mockAPI.js')

// aylien api credentials
var aylien = require("aylien_textapi");
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  })

// cors
var cors = require('cors')
app.use(cors())

// to use json
var bodyParser = require('body-parser')
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// get route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// test route
app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// post to aylien
app.post('/ask', function(req, res) {
  if(req.body.text) {
    textapi.sentiment({'url': req.body.text}, function(error, response) {
      if (error === null) {
        res.send(response);
      } else {
        console.log(error);
      }
    })
  } else {
    return res.status(400).json({
      message: 'Bad Request'
    })
  }
  
})

module.exports = app