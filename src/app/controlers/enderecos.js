const endereco = require("../models/endereco");

module.exports = {
  index(req, res) {
    endereco.paginate((enderecos) => {
      if (!enderecos) return res.send("Not found");

      return res.render("enderecos/enderecos", { enderecos });
    });
  },

  create(req, res) {
    const keys = Object.keys(req.body);

    //validation
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    Endereco.create(req.body, () => {
      res.redirect(`/enderecos`);
    });
  },
};
