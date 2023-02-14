const db = require("../../config/db");
const date = require("../../lib/utils").date;
const getArray = require("../../lib/utils").getArray;

module.exports = {
  paginate(req, callback) {
    let { filter, limit, offset } = req;

    query = `SELECT usuario.id_usuario, nome, funcao_nome, endereco  
    FROM usuario
   LEFT JOIN funcao ON (usuario.id_funcao = funcao.id_funcao)
   LEFT JOIN endereco ON (usuario.id_usuario = endereco.id_usuario)`;

    if (filter)
      query += `
      WHERE usuario.nome ILIKE '%${filter}%'`;
    db.query(query, function (err, results) {
      if (err) throw "Database";

      callback(results.rows);
    });
  },

  findBy(filter, callback) {
    db.query(
      `SELECT id_usuario, nome, funcao_nome, endereco FROM (
        SELECT * FROM usuario
        WHERE usuarios.name ILIKE '%${filter}%'
        LEFT JOIN funcao ON (usuario.id_usuario = funcao.id_funcao)
        LEFT JOIN endereco ON (usuario.id_endereco = endereco.id_endereco)
        ) as tabela
`,

      function (err, results) {
        if (err) return (res.send = "Database error!!!");

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    // Construct Object to Push to front-end
    let { nome, id_funcao } = data;

    const query = `
      INSERT INTO usuario (
        nome,
        id_funcao
      )
      VALUES ('${nome}', ${id_funcao})
      RETURNING id_usuario
  `;

    db.query(query, (err, result) => {
      if (result.rows[0].id_usuario) {
        callback(result.rows[0].id_usuario);
      }
    });
  },

  find(id, callback) {
    db.query(
      `
      SELECT id_usuario, nome, funcao_nome FROM usuario 
      LEFT JOIN funcao on usuario.id_funcao = funcao.id_funcao
      WHERE id_usuario = ${id}
      `,

      function (err, results) {
        if (results.rows == [] || err) return res.send("Database error!!!");

        callback(results.rows[0]);
      }
    );
  },

  selectFuncoes(callback) {
    return db.query("SELECT * FROM funcao", (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  update(data, callback) {
    let { nome, id_funcao, id_usuario } = data;

    const query = `UPDATE usuario SET
    nome='${nome}',
    id_funcao=${id_funcao}
    WHERE id_usuario = ${id_usuario}
    `;

    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM usuario WHERE id_usuario = ${id}`, (err, results) => {
      if (err) return res.send("Database Error!");

      callback();
    });
  },
};
