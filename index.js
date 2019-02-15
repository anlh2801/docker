const bodyParser = require('body-parser')
const express = require("express");
const tools = require('./demo_api/Tools')

// Set up the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(tools.auth)

let router = require('./demo_api/UserApi')
app.use('/router', router)

const PORT = 50000;

app.listen(PORT, () => {
  console.log(`New server running on port ${PORT}`)
});
