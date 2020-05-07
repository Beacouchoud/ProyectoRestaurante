
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'restaurante',
  password : 'FbrxJLPFMSpLk5RP',
  database : 'restaurante'
});
connection.connect();
const port = process.env.PORT || 8080;
const app = express()
.use(session({ 
  secret: 'Shh, its a secret!', 
  saveUninitialized:false,
  resave: true,
  cookie: { maxAge: 60000 }
}))
  .use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}))
  .use(bodyParser.json())
  .use(events(connection))
  .use(checkAuth);

  function checkAuth (req, res, next) {
    console.log('checkAuth ' + req.url);
    console.log(req.session);
    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if (req.url.indexOf('api') > -1 && (!req.session || !req.sessionID)) {
      console.log('not authorized');
      res.session = null;
      res.status(401);
    }else {
      console.log('authorized');
      next();
    }
  
  }

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});