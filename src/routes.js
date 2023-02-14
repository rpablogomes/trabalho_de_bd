const express = require("express");
const routes = express.Router();
const usuarios = require("./app/controlers/usuarios");
const enderecos = require("./app/controlers/enderecos");

//layout
routes.get("/", function (req, res) {
  return res.render("layout");
});

//Teachers' list
routes.get("/usuarios", usuarios.index);

//Register Page
routes.get("/usuario/register", usuarios.create);

//post
routes.post("/usuario", usuarios.post);

//show
routes.get("/usuario/:id", usuarios.show);

//edit
routes.get("/usuario/:id/edit", usuarios.edit);

//put
routes.put("/usuario", usuarios.put);

//delete
routes.delete("/usuario", usuarios.delete);

//STUDENTS

//enderecos' list
routes.get("/enderecos", enderecos.index);

//Register Page
routes.get("/enderecos/register", usuarios.create);

//post
routes.post("/endereco", enderecos.create);

module.exports = routes;
