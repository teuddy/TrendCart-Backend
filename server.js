
/**
 * Created by Teuddy J. C. R.
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocs =require('./docs/definition')
const config = require('./config/config.js')
const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const {log} = require('./utils/helpers/logger')
//no se
//nos
//bring route category for testing
const {Category} = require('./models')


const router = require('./routes')

//get variables from the actual NODE_ENV
const environment = config[
  process.env.NODE_ENV || 
  'development'
]
//pass environment database variables and app
db.connect(
  app,
  environment.database
);


app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
//ssjj


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/v1',router)

app.get('/saludos',(req,res)=>{
  res.send('hello world another version')
})

app.get('/',(req,res)=>{
  res.send("<h1>Hey, thanks for visiting!</h1>")
})



app.on("ready", () => {
  app.listen(environment.port, () => {
    log.info("Server is up on port: ", environment.port);
  });
});

module.exports = app;
