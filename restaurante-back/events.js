
const express = require('express');
let db;

function createRouter(dbConnection) {
  const router = express.Router();
  db = dbConnection;
  router.post('/register', register);
  router.post('/login', login);

  return router;
}
module.exports = createRouter;

const register = (req, res, next) => {
    console.log(req.body)
    db.query(
      'INSERT INTO usuario (nombre, apellido, email, password, telefono, direccion, habilitado, nivel) VALUES (?,?,?,?,?,?,?,?)',
      [req.body.nombre, req.body.apellido, req.body.email, req.body.password, req.body.telefono, req.body.direccion, req.body.habilitado, req.body.nivel],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({code: error.code, message: error.sqlMessage});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
}

const login = (req, res, next) => {
    console.log(req.body);
    db.query(
        'SELECT * FROM usuario WHERE email = ? AND password = ?',
        [req.body.email, req.body.password],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({code: error.code, message: error.sqlMessage});
              } else {
                res.status(200).json({status: 'ok'});
              }
        }
    );
}