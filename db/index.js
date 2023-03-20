/**
 * Created by Teuddy J.
 */
const mongoose = require("mongoose");
const {log} = require('../utils/helpers/logger')

exports.connect = (app,database) => {
  const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    log.info("MongoDB connection with retry");
    mongoose
      .connect(database.MONGODB_URI, options)
      .then(() => {
        log.info("MongoDB is connected");
        app.emit("ready");
      })
      .catch((err) => {
        log.error("MongoDB connection unsuccessful, retry after 2 seconds.", err);
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};
