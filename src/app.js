const express = require("express");
const nunjucks = require("nunjucks");
const mysql = require("mysql");
const config = require("./config/database");

const server = express();
server.use(express.static("src/public"));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("src/public", {
  express: server,
  noCache: true
});

const pool = mysql.createConnection(config);

server.get("/", (req, res) => {
  pool.query(`SELECT * FROM donors`, (err, result) => {
    if (err) return res.send(err);

    return res.render("index.njk", { donors: result });
  });
});

server.post("/", (req, res) => {
  const { name, email, blood } = req.body;

  if (name == "" || email == "" || blood == "") {
    res.send("Todos os campos são obrigatórios!");
  }

  pool.query(
    `INSERT INTO donors (name, email, blood) VALUES ('${name}', '${email}', '${blood}')`,
    err => {
      if (err) {
        console.log(err);
        return res.send("Erro ao salvar no banco de dados!");
      }

      return res.redirect("/");
    }
  );
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
