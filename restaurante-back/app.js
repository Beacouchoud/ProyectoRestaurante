const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
const expressSanitizer = require('express-sanitizer');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'restaurante',
  password : 'FbrxJLPFMSpLk5RP',
  database : 'restaurante'
});
connection.connect();
const port = process.env.PORT || 8080;
const app = express({host:'localhost'})
  .use(session({ 
    secret: 'Shh, its a secret!', 
    saveUninitialized: false,
    resave: true,
    cookie: { 
      httpOnly: true, 
      maxAge: 60000 
    }
  }))
    .use(cors({origin: [
      "http://localhost:4200"
    ], credentials: true}))
    .use(bodyParser.json())
    .use(expressSanitizer())
    .use(checkAuth)
    .use(events.router(connection));

    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });

  function checkAuth (req, res, next) {
    authorized = ['/login', '/register', '/activeUser', '/getPlatos', '/getMenusList', '/getPlatosFromMenu'];
    headers = JSON.parse(JSON.stringify(req.headers));
    if (authorized.includes(req.url.split('?')[0])) {
      console.log('authorization not required');
      next();
    } else if ((events.session() && headers.authorization != events.session().id) || !req.session || !req.sessionID) {
      events.session() = undefined;
      req.session.destroy((err) => {
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(401);
        }
          res.end();
      });
    }else {
      console.log('authorized');
      next();
    }
  }

