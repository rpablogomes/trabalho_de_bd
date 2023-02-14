const db = require("../../config/db");

module.exports = {
  paginate(callback) {
    query = `SELECT * FROM endereco`;

    db.query(query, function (err, results) {
      if (err) throw "Database";

      callback(results.rows);
    });
  },

  create(data, callback) {
    let { endereco, id_usuario } = data;

    const query = `
            INSERT INTO enderecos (
              nome,
              id_usuario
            VALUES ($1, $2)
        `;

    db.query(query, function (err, results) {
      if (err) throw "Database error!!!";

      callback();
    });
  },
};
