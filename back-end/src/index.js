const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const middlewares = require("./middlewares");

const app = express();

app.use(cors({origin: "*"}));

// --- Os primeiros middlewares
// app.use cadastra um middleware para ser executado em todos os tipos de request

// O morgan é um middleware que registra no console as requisições que estão sendo feitas
app.use("*", morgan("dev"));

// O express.json é um middleware que transforma o body da requisição em um objeto JSON
app.use("*", express.json());
// -----------------------------------

// ---- Os middlewares de rota -----
app.get("/", middlewares.hello);
app.get("/segredo", middlewares.segredo);
// Cadastre os novos middlewares de rota aqui
app.get("/todos", middlewares.findAllTodos);
app.get("/todos/:id", middlewares.findTodoById);
app.post("/todos", middlewares.createTodo);
app.patch("/todos/:id", middlewares.updateTodo);
app.delete("/todos/:id", middlewares.deleteTodo);

// -----------------------------------

// Esse comando liga o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor sendo executado em http://localhost:3000");
});
