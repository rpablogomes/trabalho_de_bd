const usuarios = require("../models/usuario");
const date = require("../../lib/utils").date;

module.exports = {
  index(req, res) {
    let { filter } = req.query;

    usuarios.paginate({ filter }, (usuarios) => {
      if (!usuarios) return res.send("Not found");

      return res.render("usuarios/usuarios", {
        usuarios,
        filter,
      });
    });
  },

  create(req, res) {
    usuarios.selectFuncoes((funcoes) => {
      return res.render("usuarios/register", { funcoes });
    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }

      usuarios.create(req.body, (id) => {
        return res.redirect(`/usuario/${id}`);
      });
    }
  },

  show(req, res) {
    if (req.params.id) {
      usuarios.find(req.params.id, (usuario) => {
        const foundusuario = {
          ...usuario,
        };

        return res.render("usuarios/usuario", { usuario: foundusuario });
      });
    }
  },

  edit(req, res) {
    usuarios.selectFuncoes((data) => {
      const funcoes = [...data];

      usuarios.find(req.params.id, (usuario) => {
        const foundusuario = {
          ...usuario,
        };

        return res.render("usuarios/edit", {
          usuario: foundusuario,
          funcoes: funcoes,
        });
      });
    });
  },

  put(req, res) {
    usuarios.update(req.body, () => {
      return res.redirect(`usuario/${req.body.id_usuario}`);
    });
  },

  delete(req, res) {
    usuarios.delete(req.body.id, () => {
      return res.redirect("/usuarios");
    });
  },
};
