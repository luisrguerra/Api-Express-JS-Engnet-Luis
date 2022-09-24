const listaTarefas = document.getElementById("lista-tarefas");

function fetchTodos() {
    fetch("http://localhost:3000/todos", { method: "GET" })
        .then((response) => response.json())
        .then((response) => {
            atualizarLista(response);
        })
        .catch((e) => {
            console.log(e);
        });
}

fetchTodos();

function atualizarLista(listaTodos) {
    if (!Array.isArray(listaTodos)) {
        console.log("Array de Todos inválido!");
        return;
    }
    listaTodos.forEach((todo) => {
        let nome = document.createElement("h4");
        nome.innerText = todo.nome;

        let descricao = document.createElement("p");
        descricao.innerText = todo.descricao;

        let data = document.createElement("input");
        data.type = "date";
        const objData = new Date(todo.data);
        data.value = objData;
        //const dataFormatada = new Intl.DateTimeFormat("pt-br").format(objData);
        //data.innerText = dataFormatada;

        let concluido = document.createElement("input");
        concluido.type = "checkbox";
        concluido.value = Boolean(todo.concluido);
        concluido.checked = Boolean(todo.concluido);

        concluido.onclick = () => {
            let item = {
                concluido: concluido.checked,
            }
            let requestOptions = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            }
            fetch(`http://localhost:3000/todos/${todo.id}`, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    fetchTodos();
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        let botaoDeletar = document.createElement("button");
        botaoDeletar.type = "button";
        botaoDeletar.innerText = "X";
        botaoDeletar.onclick = () => {
            fetch(`http://localhost:3000/todos/${todo.id}`, { method: "DELETE" })
                .then((response) => response.text())
                .then((response) => {
                    console.log(response);
                    fetchTodos();
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        let tarefa = document.createElement("li");
        tarefa.appendChild(nome);
        tarefa.appendChild(descricao);
        tarefa.appendChild(data);
        tarefa.appendChild(concluido);
        tarefa.appendChild(botaoDeletar);

        tarefa.className = "item-lista";

        listaTarefas.appendChild(tarefa);
    })
}

const botaoCriarTarefa = document.getElementById("criar-tarefa");
const inputNome = document.getElementById("nome-todo");
const inputDesc = document.getElementById("desc-todo");
const inputData = document.getElementById("data-todo");

botaoCriarTarefa.addEventListener("click", () => {

    let todo = {
        nome: inputNome.value,
        descricao: inputDesc.value,
        data: "2022-02-19T05:30:02.580Z",
    }

    let requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }


    fetch("http://localhost:3000/todos", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            fetchTodos();
        })
        .catch((e) => {
            console.log(e);
        })
})