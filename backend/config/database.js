// connection to datebase
const mongoose = require("mongoose");
require('dotenv').config();


const dbconnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = dbconnection;
