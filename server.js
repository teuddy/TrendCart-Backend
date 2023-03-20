/**
 * Created by Teuddy J.
 */
const config = require('./config/config.js')
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const {log} = require('./utils/helpers/logger')


//get variables from the actual NODE_ENV
const environment = config[
  process.env.NODE_ENV || 
  'development'
]

log.info("The Backend is Running on this config:",environment)

//pass environment database variables and app
db.connect(
  app,
  environment.database
  );

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// adding routes
require("./routes")(app);

app.get('/saludos',(req,res)=>{
  res.send("hello world ")
})

app.get('/health',(req,res)=>{
  res.json({
    name:"rafa",
    age:34
  })
})

app.on("ready", () => {
  app.listen(environment.port, () => {
    log.info("Server is up on port: ", environment.port);
  });
});

module.exports = app;
