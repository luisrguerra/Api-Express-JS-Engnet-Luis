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

module.exports = {
  hello,
  segredo,
};
