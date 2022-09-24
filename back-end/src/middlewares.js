let todos = require("./database/todos.json");

function getNextId() {
  return todos[todos.length - 1].id + 1;
}

function hello(request, response) {
  return response.send("Bem vindo a minha primeira API !!!");
}

function segredo(request, response) {
  const resposta = {
    mensagem: "Você descobriu um segredo",
    segredo:
      "É possível criar um middleware com a palavra function ou usando uma arrow function",
    dica: "Dá pra visualizar uma resposta em JSON no navegador ou usando o Insomnia",
  };

  return response.json(resposta);
}

// Insira novos middlewares de rota aqui

function findAllTodos(request, response) {
  return response.json(todos);
}

function findTodoById(request, response) {
  const { id } = request.params;

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return response.status(404).send("Todo não encontrado");
  }

  return response.json(todo);
}

function createTodo(request, response) {
  const { nome, descricao, data } = request.body;

  console.log(request.body);

  if (!nome) {
    return response.status(400).json("Nome inválido");
  }
  if (!descricao) {
    return response.status(400).json("Descricao inválido");
  }
  if (!data) {
    return response.status(400).json("Data inválida");
  }

  const dataString = new Date(data);

  if (dataString.toString() === "Invalid Date") {
    return response.status(400).json("Data inválida");
  }

  const todo = {
    id: getNextId(),
    nome,
    descricao,
    data: new Date(data),
    concluido: false,
  };

  todos.push(todo);

  return response.status(201).json(todo);
}

function updateTodo(request, response) {
  const { id } = request.params;
  const { nome, descricao, data, concluido } = request.body;

  let todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return response.status(404).json("Todo não encontrado.");
  }

  if (!nome && !descricao && !data && concluido == undefined) {
    return response.status(400).json("Informe no mínimo 1 dado para ser atualizado.");
  }

  const dataString = new Date(data);

  if(data != undefined){
    if (dataString.toString() === "Invalid Date") {
      return response.status(400).json("Data inválida.");
    }
  }

  todo = {
    ...todo,
    nome: nome? nome : todo.nome,
    descricao: descricao? descricao : todo.descricao,
    data: data? new Date(data) : todo.data,
    concluido: concluido != undefined ? Boolean(concluido) : todo.concluido,
  };

  todos[id] = todo;

  return response.status(200).json(todo);
}

function deleteTodo(request, response) {
  const { id } = request.params;

  let todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return response.status(404).send("Todo não encontrado.");
  }

  todos.splice(id, 1);

  return response.status(204).send();
}

module.exports = {
  hello,
  segredo,
  findAllTodos,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};