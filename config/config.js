
module.exports = {
  development:{
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    database: {
      MONGODB_URI: process.env.MONGODB_URI
    }
},
  staging:{
    environment: process.env.NODE_ENV || "staging",
    port: process.env.PORT || 8080,
    database: {
      MONGODB_URI: process.env.MONGODB_URI
    }
  }
}



// {
//   "test":{
//     "PORT": 8000,
//     "MONGODB_URI": "mongodb://mongo:27017/TodoAppTest"
//   },
//   "development":{
//     "PORT": 8000,
//     "MONGODB_URI": "mongodb://mongo:27017/TodoApp"
//   }
// }