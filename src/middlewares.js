const enderecoJson = require("./database/todos.json");

function getNextId() {
  return enderecoJson[enderecoJson.length - 1].id + 1;
}

function hello(request, response) {
  return response.send("<h1>Bem vindo a minha primeira API !!!</h1>");
}

function segredo(request, response) {
  const resposta = {
    mensagem: "Você descobriu um segredo",
    segredo:
      "É possível criar um middleware com a palavra function ou usando uma arrow function",
    dica: "Dá pra visualizar uma resposta em JSON no navegador ou usando o Insomnia",
  };
enderecoJsontodos
  return response.json(resposta);
}

// Insira novos middlewares de rota aqui

function findAllTodos(request, response) {
  return response.json(enderecoJson);
}

function findTodoById(request, response) {
  const { id } = request.params;

  const todo = enderecoJson.find((todo) => todo.id === Number(id));

  if (!todo) {
    return response.status(404).send("Todo não encontrado");
  }

  return response.json(todo);
}

function createTodo(request, response) {
  const { nome, descricao, data } = request.body;

  if (!nome || !descricao || !data) {
    return response.status(400).send("Dados inválidos");
  }

  const dataString = new Date(data);

  if (dataString.toString() === "Invalid Date") {
    return response.status(400).send("Data inválida");
  }

  const todo = {
    id: getNextId(),
    nome,
    descricao,
    data: new Date(data),
    concluido: false,
  };

  enderecoJson.push(todo);

  return response.status(201).json(todo);
}

module.exports = {
  hello,
  segredo,
  findAllTodos,
  findTodoById,
  createTodo,
};
