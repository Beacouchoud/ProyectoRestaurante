
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
  router.get('/getMenusList', getMenusList); 
  router.get('/getPlatosFromMenu', getPlatosFromMenu);
  router.post('/createPedido', createPedido, addDetalle);
  router.get('/getPedidosList', getPedidosList);
  router.get('/getDetalleFromPedido', getDetalleFromPedido);
  router.post('/updateEstado', updateEstado);
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
    'SELECT * FROM menu',
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

const getPlatosFromMenu = (req, res, next) => { 
  db.query('select * from plato where id_plato in (select id_plato from platos_menu where platos_menu.id_menu = ?)',
    [req.query.idMenu],
    (error, result) => {
      if (error) {
       // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
       // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log('Listado de platos del menu -> ', data);
        res.status(200).json(result);
      }
    }
  );
};

const createPedido = (req, res, next) => {
  db.query('INSERT INTO pedido (id_cliente, fecha, direccion, telefono, email, forma_pago, estado, precio_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [req.body.usuario.id_usuario, req.body.pedido.fecha, req.body.pedido.direccion, req.body.pedido.telefono, req.body.pedido.email, req.body.pedido.pago, 'PENDIENTE', 50],
    (error, result) => {
      if (error) {
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
        console.log('REQ.BODY CREATE PEDIDO', JSON.parse(JSON.stringify(req.body)));
        console.log('RESULT CREATE PEDIDO', JSON.parse(JSON.stringify(result)));
        let info = {
          id_pedido: JSON.parse(JSON.stringify(result)).insertId,
          detalle: JSON.parse(JSON.stringify(req.body.detalle))
        };
        next(info);
      }
    }
  );
}

const addDetalle = (data, req, res, next) => {
  let info = [];
  for (const index in data.detalle) {
    if (data.detalle[index].menu == true ) {
      info.push(new Array(data.id_pedido, data.detalle[index].id, data.detalle[index].nombre_menu, data.detalle[index].cantidad));
    }
  }
  console.log('ADD DETALLE', info);
  db.query('INSERT INTO detalle_pedido (id_pedido, id_menu, nombre_menu, cantidad) VALUES ?',
    [info],
    (error, result) => {
      if (error) {
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
        console.log('REQ.BODY ADD DETALLE', JSON.parse(JSON.stringify(req.body)));
        console.log('data ', data);
        res.status(200).json(result);
      }
    }
  );
};

const getPedidosList = (req, res, next) => {
  db.query(
    'SELECT * FROM pedido',
    [],
    (error, result) => {
      if (error) {
       // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
       // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log('Listado de pedidos -> ', data);
        res.status(200).json(result);
      }
    }
  );
};

const getDetalleFromPedido = (req, res, next) => {
  db.query(
    'select * from detalle_pedido where id_pedido in (select id_pedido from detalle_pedido where detalle_pedido.id_pedido = ?)',
    [req.query.idPedido],
    (error, result) => {
      if (error) {
      // console.error(error);
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
      // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log('Detalles del pedido -> ', data);
        res.status(200).json(result);
      }
    }
  );
};

const updateEstado = (req, res, next) => {
  console.log(req.body);
  db.query(
    'UPDATE pedido SET estado = (?) WHERE id_pedido = (?)',
    [req.body.estado, req.body.idPedido],
    (error, result) => {
      if (error) {
        res.status(500).json({code: error.code, message: error.sqlMessage});
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log('Cambio de estado -> ', data);
        res.status(200).json(req.body.estado);
      }
    }
  );
}