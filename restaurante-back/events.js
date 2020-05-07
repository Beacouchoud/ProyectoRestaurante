
const express = require('express');
let db;
var sess;
function createRouter(dbConnection) {
  const router = express.Router();
  db = dbConnection;
  router.post('/login', login);
  router.post('/register', register);
  router.post('/activeUser', activeUser);
  router.get('/usersList', usersList);
  router.get('/logout', logout);
  router.post('/createPlato', createPlato);
  router.get('/getPlatos', getPlatos);
  router.post('/createMenu', createMenu, deletePlatosMenu, addPlatosMenu);
  router.get('/getMenusList', getMenusList); //, getPlatosMenu
  return router;
}
module.exports = createRouter;



const register = (req, res, next) => {
    // console.log(req.body)
    db.query(
      'INSERT INTO usuario (nombre, apellido, email, password, telefono, direccion, habilitado, nivel) VALUES (?,?,?,?,?,?,?,?)',
      [req.body.nombre, req.body.apellido, req.body.email, req.body.password, req.body.telefono, req.body.direccion, req.body.habilitado, req.body.nivel],
      (error, result) => {
        if (error) {
          // console.error(error);
          res.status(500).json({code: error.code, message: error.sqlMessage});
        } else {
        
          res.status(200).json(result);
        }
      }
    );
};

const login = (req, res, next) => {
    // console.log(req.body);
    
    db.query(
        'SELECT * FROM usuario WHERE email = ? AND password = ?',
        [req.body.email, req.body.password],
        (error, result) => {
            // console.log(error, result);
            if (error) {
                // console.error(error);
                req.session.authenticated = false;
                res.status(500).json({code: error.code, message: error.sqlMessage});
              } else if (result.length === 0) {
                res.status(404).json({message: 'User not found'});
              } else {
                sess = req.session;
                let data = JSON.parse(JSON.stringify(result));
                sess.email = data[0].email;
                sess.userId = data[0].id_usuario;
                sess.nivel = data[0].nivel;
                sess.authenticated = true;
                sess.id = req.sessionID;
                // console.log(req.session);
                // console.log("var sess = "+ JSON.stringify(sess));
                delete data[0].password;
                data[0].sessionId = req.sessionID;
                res.status(200).json(data[0]);
              }
        }
    );
};

const logout = (req, res, next) => {
    // console.log('logout');
    // console.log(req.session);
    // console.log("var sess = "+ JSON.stringify(sess));
    sess = undefined;
    req.session.destroy((err) => {
      //  console.log('error cerrando session',err);
        if(err) {
            res.status(500).json(err);
        } else {
          //  console.log(req.session);
            res.status(200);
        }
        res.end();
    });
};

const getUser = (req, res, next) => {
 // console.log(req.body);
  db.query(
    'SELECT * FROM usuario WHERE usuarioId = ?',
    [req.body],
    (error, result) => {
       // console.log(error, result);
        if (error) {
         //   console.error(error);
            res.status(500).json({code: error.code, message: error.sqlMessage});
          } else {
            res.status(200).json(result);
          }
    }
);
};

const createPlato = (req, res, next) => {
  db.query(
    'INSERT INTO plato (nombre_plato, tipo, precio, descripcion, habilitado) VALUES (?,?,?,?,?)',
      [req.body.nombre, req.body.tipo, req.body.precio, req.body.descripcion, req.body.habilitado],
      (error, result) => {
        if (error) {          
         // console.error(error);         
          res.status(500).json({code: error.code, message: error.sqlMessage});
        } else {        
          res.status(200).json(result);
        }
      }
  );
};

const getPlatos = (req, res, next) => {
  //console.log('platos', req.body);
  db.query(
    'SELECT * FROM plato',
    [],
    (error, result) => {
      if (error) {
       // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
       // console.log(JSON.stringify(result));
        res.status(200).json(result);
      }
    }
  );
};

const activeUser = (req, res, next) => {
  console.log("[Active User] token" , req.body);
  console.log("[Active Session] " , sess);
  if (sess && sess.id == req.body.token) {
    console.log('[Active User] user logged token y session:', req.body.token, sess.id);
    db.query(
      'SELECT * FROM usuario WHERE id_usuario = ?',
      [sess.userId],
      (error, result) => {
        console.log('ERROR: ', error, 'RESULT: ', result);
        if (error) {
          console.error(error);
          res.status(500).json({code: error.code, message: error.sqlMessage});
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  } else {
    console.log('[Active User] user not logged');
    res.status(200).json(null);
  }
};

const usersList = (req, res, next) => {
  db.query(
    'SELECT id_usuario, nombre, apellido, email, telefono, direccion, habilitado, nivel FROM usuario',
    [],
    (error, result) => {
      console.log('ERROR usuarios', error, 'RESULT usuarios', result);
      if (error) {
       // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
       // console.log(JSON.stringify(result));
        res.status(200).json(result);
      }
    }
  );
};

const createMenu = (req, res, next) => {

  // if (req.body.idMenu) {

  // } else {
    
  // }
  db.query(
    'INSERT INTO menu (nombre_menu, descripcion, imagen, precio, habilitado) VALUES (?,?,?,?,?)',
    [req.body.nombre, req.body.descripcion, req.body.imagen, req.body.precio, req.body.habilitado],
    (error, result) => {
      if (error) {          
       console.error('Error creando menú');         
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {     
        console.log(('Menú creado correctamente')); 
        let info = {idMenu: JSON.parse(JSON.stringify(result)).insertId, platos: req.body.platos};
        next(info);
      }
    }
  );
};

const deletePlatosMenu = (info, req, res, next) => {
  let data = info.idMenu;

  db.query(
    'DELETE FROM platos_menu WHERE id_menu = ?',
    [data],
    (error, result) => {
      if (error) {          
        console.error('Error borrando registros previos', error);    
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {     
        console.log('Borrando registros previos'); 
        next(info); 
      }
    }
  );
};

const addPlatosMenu = (info, req, res, next) => {
  let data = [];  
  for (const index in info.platos) { 
    data.push(new Array(info.idMenu, info.platos[index]));
  }
    db.query(
    'INSERT INTO platos_menu (id_menu, id_plato) VALUES ?',
    [data],
      (error, result) => {
        if (error) {          
          console.error('Error añadiendo platos');         
          res.status(500).json({code: error.code, message: error.sqlMessage});
        } else {
          console.log('Platos añadidos correctamente');
          res.status(200).json(result);
        }
      }
    );
};

const getMenusList = (req, res, next) => { 
  db.query(
    'Select menu.* , plato.* from menu inner join (platos_menu inner join plato on plato.id_plato = platos_menu.id_plato) on menu.id_menu = platos_menu.id_menu order by menu.id_menu',
    [],
    (error, result) => {
      if (error) {
       // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
       // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log('Listado de menus -> ', data);
        res.status(200).json(result);
      }
    }
  );
};

// const getPlatosMenu  = (data, req, res, next) => { 
//   let menus = new Array();  
//   for (const index in data) { 
//     db.query(
//       'SELECT * FROM platos_menu WHERE id_menu = ?',
//       [data[index].id_menu],
//       (error, result) => {
//         if (error) {
//           console.error('Error recuperando los platos', error);
//           res.status(500).json({code: error.code, message: error.sqlMessage});
//         } else {
//           let platos = JSON.parse(JSON.stringify(result));
//           menus.push( {menu: data[index], platos: platos} );
//           console.log('PLATOS ', JSON.parse(JSON.stringify(result)));
//           console.log('MENUS COMPLETOS', JSON.parse(JSON.stringify(menus)));
//         }
//       }
//     );
//   }
// };