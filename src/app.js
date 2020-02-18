const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

server.use(express.static("src/public"));

nunjucks.configure("src/public", {
  express: server
});

server.get("/", (req, res) => {
  res.render("index.html");
});

server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
