const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 3000;

//use middleware
app.use(cors());
app.use(express.json());

//mongdodb connection
const con = require('./db/connection.js');

//using routes
app.use(require("./routes/route"));

con.then(db => {
  if(!db) return process.exit(1);

  //listen to the http server
  app.listen(port, () => {
    console.log( `Server is running on port: http://localhost:${port}`)
  });

  app.on('error', err => console.log(`Failed to Connect with HTTP Server:${err}`));
  //eeror in mongodb connection
}).catch(error => {
  console.log(`Connection Failed...!${error}`);
});



