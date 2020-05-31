const express = require("express");
const bcrypt = require("bcrypt");
let db;
var sess;
function createRouter(dbConnection) {
  const router = express.Router();
  db = dbConnection;
  router.post("/login", login);
  router.post("/register", register);
  router.post("/activeUser", activeUser);
  router.get("/usersList", usersList);
  router.get("/logout", logout);
  router.post("/createPlato", createPlato);
  router.get("/getPlatos", getPlatos);
  router.post("/createMenu", createMenu, deletePlatosMenu, addPlatosMenu);
  router.get("/getMenusList", getMenusList);
  router.get("/getPlatosFromMenu", getPlatosFromMenu);
  router.post("/createPedido", createPedido, addDetalle);
  router.get("/getPedidosList", getPedidosList);
  router.get("/getDetalleFromPedido", getDetalleFromPedido);
  router.post("/updateEstado", updateEstado);
  router.post("/enableMenu", enableMenu);
  router.post("/enablePlato", enablePlato);
  router.post("/enableUser", enableUser);
  router.post("/updateNivel", updateNivel);
  router.post("/updatePlato", updatePlato);
  router.post("/updateMenu", updateMenu, deletePlatosMenu, addPlatosMenu);
  router.post("/updateUser", updateUser);
  router.post("/updatePwd", getUser, updatePwd);
  return router;
}


function getSession() {
  return sess;
}
module.exports = { router: createRouter, session: getSession };

const register = (req, res, next) => {
  nombre = req.sanitize(req.body.nombre);
  apellido = req.sanitize(req.body.apellido);
  email = req.sanitize(req.body.email);
  password = bcrypt.hashSync(req.body.password, 4);
  telefono = req.sanitize(req.body.telefono);
  direccion = req.sanitize(req.body.direccion);
  habilitado = req.sanitize(req.body.habilitado);
  nivel = req.sanitize(req.body.nivel);
  db.query(
    "INSERT INTO usuario (nombre, apellido, email, password, telefono, direccion, habilitado, nivel) VALUES (?,?,?,?,?,?,?,?)",
    [nombre, apellido, email, password, telefono, direccion, habilitado, nivel],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

const login = (req, res, next) => {
  db.query(
    "SELECT * FROM usuario WHERE email = ?",
    [req.body.email],
    (error, result) => {
      if (error) {
        req.session.authenticated = false;
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else if (result.length === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        let data = JSON.parse(JSON.stringify(result));

        if (bcrypt.compareSync(req.body.password, data[0].password.toString())) {
          sess = req.session;
          sess.email = data[0].email;
          sess.userId = data[0].id_usuario;
          sess.nivel = data[0].nivel;
          sess.authenticated = true;
          sess.id = req.sessionID;
          delete data[0].password;
          data[0].sessionId = req.sessionID;
          res.status(200).json(data[0]);
        } else {
          res.status(404).json({ message: "Contraseña incorrecta" });
        }
      }
    }
  );
};
const logout = (req, res, next) => {
  sess = undefined;
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200);
    }
    res.end();
  });
};

const getUser = (req, res, next) => {
  // console.log(req.body);
  db.query(
    "SELECT * FROM usuario WHERE id_usuario = ?",
    [req.body.id],
    (error, result) => {
      if (error) {
        //   console.error(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        // res.status(200).json(result);
        next(result);
      }
    }
  );
};

const createPlato = (req, res, next) => {
  db.query(
    "INSERT INTO plato (nombre_plato, tipo, precio, descripcion, habilitado) VALUES (?,?,?,?,?)",
    [
      req.body.nombre,
      req.body.tipo,
      req.body.precio,
      req.body.descripcion,
      req.body.habilitado,
    ],
    (error, result) => {
      if (error) {
        // console.error(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

const getPlatos = (req, res, next) => {
  //console.log('platos', req.body);
  db.query("SELECT * FROM plato", [], (error, result) => {
    if (error) {
      // console.error(error);
      res.status(500).json({ code: error.code, message: error.sqlMessage });
    } else {
      // console.log(JSON.stringify(result));
      res.status(200).json(result);
    }
  });
};

const activeUser = (req, res, next) => {
  console.log("[Active User] token", req.body);
  console.log("[Active Session] ", sess);
  if (sess && sess.id == req.body.token) {
    console.log(
      "[Active User] user logged token y session:",
      req.body.token,
      sess.id
    );
    db.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [sess.userId],
      (error, result) => {
        console.log("ERROR: ", error, "RESULT: ", result);
        if (error) {
          console.error(error);
          res.status(500).json({ code: error.code, message: error.sqlMessage });
        } else {
          let data = JSON.parse(JSON.stringify(result));
          delete data[0].password;
          res.status(200).json(data[0]);
        }
      }
    );
  } else {
    console.log("[Active User] user not logged");
    res.status(200).json(null);
  }
};

const usersList = (req, res, next) => {
  db.query(
    "SELECT id_usuario, nombre, apellido, email, telefono, direccion, habilitado, nivel FROM usuario",
    [],
    (error, result) => {
      console.log("ERROR usuarios", error, "RESULT usuarios", result);
      if (error) {
        // console.error(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        // console.log(JSON.stringify(result));
        res.status(200).json(result);
      }
    }
  );
};

const createMenu = (req, res, next) => {
  console.log(req.body);
  db.query(
    "INSERT INTO menu (nombre_menu, descripcion, imagen, precio, habilitado) VALUES (?,?,?,?,?)",
    [
      req.body.nombre,
      req.body.descripcion,
      req.body.imagen,
      req.body.precio,
      req.body.habilitado,
    ],
    (error, result) => {
      if (error) {
        console.error("Error creando menú");
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        console.log("Menú creado correctamente");
        let info = {
          idMenu: JSON.parse(JSON.stringify(result)).insertId,
          platos: req.body.platos,
        };
        next(info);
      }
    }
  );
};

const deletePlatosMenu = (info, req, res, next) => {
  let data = info.idMenu;

  db.query(
    "DELETE FROM platos_menu WHERE id_menu = ?",
    [data],
    (error, result) => {
      if (error) {
        console.error("Error borrando registros previos", error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        console.log("Borrando registros previos");
        next(info);
      }
    }
  );
};

const addPlatosMenu = (info, req, res, next) => {
  let data = [];
  console.log();
  for (const index in info.platos) {
    data.push(new Array(info.idMenu, info.platos[index].id_plato));
  }
  console.log('DATA', data);
  db.query(
    "INSERT INTO platos_menu (id_menu, id_plato) VALUES ?",
    [data],
    (error, result) => {
      if (error) {
        console.error("Error añadiendo platos");
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        console.log("Platos añadidos correctamente");
        res.status(200).json(result);
      }
    }
  );
};

const getMenusList = (req, res, next) => {
  db.query("SELECT * FROM menu", [], (error, result) => {
    if (error) {
      // console.error(error);
      res.status(500).json({ code: error.code, message: error.sqlMessage });
    } else {
      // console.log(JSON.stringify(result));
      let data = JSON.parse(JSON.stringify(result));
      console.log("Listado de menus -> ", data);
      res.status(200).json(result);
    }
  });
};

const getPlatosFromMenu = (req, res, next) => {
  db.query(
    "select * from plato where id_plato in (select id_plato from platos_menu where platos_menu.id_menu = ?)",
    [req.query.idMenu],
    (error, result) => {
      if (error) {
        // console.error(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log("Listado de platos del menu -> ", data);
        res.status(200).json(result);
      }
    }
  );
};

const createPedido = (req, res, next) => {
  db.query(
    "INSERT INTO pedido (id_cliente, fecha, direccion, telefono, email, forma_pago, estado, precio_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.usuario.id_usuario,
      req.body.pedido.fecha,
      req.body.pedido.direccion,
      req.body.pedido.telefono,
      req.body.pedido.email,
      req.body.pedido.pago,
      "PENDIENTE",
      req.body.pedido.precio
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        console.log(
          "REQ.BODY CREATE PEDIDO",
          JSON.parse(JSON.stringify(req.body))
        );
        console.log("RESULT CREATE PEDIDO", JSON.parse(JSON.stringify(result)));
        let info = {
          id_pedido: JSON.parse(JSON.stringify(result)).insertId,
          detalle: JSON.parse(JSON.stringify(req.body.detalle)),
        };
        next(info);
      }
    }
  );
};

const addDetalle = (data, req, res, next) => {
  let info = [];
  for (const index in data.detalle) {
    if (data.detalle[index].menu == true) {
      info.push(
        new Array(
          data.id_pedido,
          data.detalle[index].id,
          data.detalle[index].nombre_menu,
          data.detalle[index].cantidad
        )
      );
    }
  }
  console.log("ADD DETALLE", info);
  db.query(
    "INSERT INTO detalle_pedido (id_pedido, id_menu, nombre_menu, cantidad) VALUES ?",
    [info],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        console.log(
          "REQ.BODY ADD DETALLE",
          JSON.parse(JSON.stringify(req.body))
        );
        console.log("data ", data);
        res.status(200).json(result);
      }
    }
  );
};

const getPedidosList = (req, res, next) => {
  db.query("SELECT * FROM pedido", [], (error, result) => {
    if (error) {
      // console.error(error);
      res.status(500).json({ code: error.code, message: error.sqlMessage });
    } else {
      // console.log(JSON.stringify(result));
      let data = JSON.parse(JSON.stringify(result));
      console.log("Listado de pedidos -> ", data);
      res.status(200).json(result);
    }
  });
};

const getDetalleFromPedido = (req, res, next) => {
  db.query(
    "select * from detalle_pedido where id_pedido in (select id_pedido from detalle_pedido where detalle_pedido.id_pedido = ?)",
    [req.query.idPedido],
    (error, result) => {
      if (error) {
        // console.error(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        // console.log(JSON.stringify(result));
        let data = JSON.parse(JSON.stringify(result));
        console.log("Detalles del pedido -> ", data);
        res.status(200).json(result);
      }
    }
  );
};

const updateEstado = (req, res, next) => {
  console.log(req.body);
  db.query(
    "UPDATE pedido SET estado = (?) WHERE id_pedido = (?)",
    [req.body.estado, req.body.idPedido],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de estado -> ", data);
        res.status(200).json(req.body.estado);
      }
    }
  );
};

const enableMenu = (req, res, next) => {
  db.query(
    "UPDATE menu SET habilitado = (?) WHERE id_menu = (?)",
    [req.body.habilitado, req.body.id],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de habilitado -> ", data);
        res.status(200).json(req.body.habilitado);
      }
    }
  );
};

const enablePlato = (req, res, next) => {
  console.log('enable plato', req.body);
  db.query(
    "UPDATE plato SET habilitado = (?) WHERE id_plato = (?)",
    [req.body.habilitado, req.body.id],
    (error, result) => {
      if (error) {
        console.log('error', error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de habilitado -> ", data);
        res.status(200).json(req.body.habilitado);
      }
    }
  );
};

const enableUser = (req, res, next) => {
  console.log('enable plato', req.body);
  db.query(
    "UPDATE usuario SET habilitado = (?) WHERE id_usuario = (?)",
    [req.body.habilitado, req.body.id],
    (error, result) => {
      if (error) {
        console.log('error', error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de habilitado -> ", data);
        res.status(200).json(req.body.habilitado);
      }
    }
  );
};

const updateNivel = (req, res, next) => {
  console.log(req.body);
  db.query(
    "UPDATE usuario SET nivel = (?) WHERE id_usuario = (?)",
    [req.body.nivel, req.body.idUsuario],
    (error, result) => {
      if (error) {
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de estado -> ", data);
        res.status(200).json(req.body.nivel);
      }
    }
  );
};


const updateUser= (req,res,next) => {
  console.log(req.body);
  db.query(
    "UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, email = ?, telefono = ? WHERE id_usuario = ?",
    [req.body.usuario.nombre, req.body.usuario.apellido, req.body.usuario.direccion, req.body.usuario.email, req.body.usuario.telefono, req.body.id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de estado -> ", data);
        res.status(200).json(result);
      }
    }
  );
};

const updatePwd= (userData, req,res,next) => {
  
  let userdata = JSON.parse(JSON.stringify(userData));
  console.log(req.body);
  console.log(userdata[0].password);
  if (bcrypt.compareSync(req.body.oldPassword, userdata[0].password)) {
    newPassword =  bcrypt.hashSync(req.body.newPassword, 4);
    console.log(newPassword);
    db.query(
      "UPDATE usuario SET password = ? WHERE id_usuario = ?",
      [newPassword, req.body.id],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ code: error.code, message: error.sqlMessage });
        } else {
          let data = JSON.parse(JSON.stringify(result));
          console.log("Cambio de estado -> ", data);
          res.status(200).json(result);
        }
      }
    );
  } else {
    console.log('Las contraseñas no coinciden');
    res.end();
  }
}

const updatePlato= (req,res,next) => {
  console.log(req.body);
  db.query(
    "UPDATE plato SET nombre_plato = ?, descripcion = ?, precio = ?, tipo = ? WHERE id_plato = ?",
    [req.body.plato.nombre, req.body.plato.descripcion, req.body.plato.precio, req.body.plato.tipo, req.body.id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de estado -> ", data);
        res.status(200).json(result);
      }
    }
  );
}

const updateMenu= (req,res,next) => {
  console.log(req.body);
  db.query(
    "UPDATE menu SET nombre_menu = ?, descripcion = ?, imagen = ?, precio = ? WHERE id_menu = ?",
    [req.body.menu.nombre, req.body.menu.descripcion, req.body.menu.imagen, req.body.menu.precio, req.body.id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ code: error.code, message: error.sqlMessage });
      } else {
        let data = JSON.parse(JSON.stringify(result));
        console.log("Cambio de estado -> ", data);
        let info = {
          idMenu: req.body.id,
          platos: req.body.menu.platos,
        };
        next(info);
      }
    }
  );
}
