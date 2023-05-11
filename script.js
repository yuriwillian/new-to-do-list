const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];

const setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.classList.add("todo__item");
    item.innerHTML = `
        <label class="todo__item">
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
        </label>
    `;
    item.addEventListener("click", clickItem);
    document.getElementById("todoList").appendChild(item);
};

const limparTarefas = () => {
    const todoList = document.getElementById("todoList");
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
};

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
};

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push({ "tarefa": texto, "status": "" });
        setBanco(banco);
        atualizarTela();
        evento.target.value = "";
    }
};

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
};

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
};



const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
};

const toggleDarkMode = () => {
  const body = document.body;
  const darkModeButton = document.getElementById("darkModeButton");
  
  body.classList.toggle("dark-mode");
  darkModeButton.classList.toggle("dark-mode-on");
};

document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);


document.getElementById("newItem").addEventListener("keypress", inserirItem);
atualizarTela();
