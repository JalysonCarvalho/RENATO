// Simulação de banco de dados em memória
let contas = [];

document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (username === "admin" && password === "1234") {
                window.location.href = "menu.html";
            } else {
                document.getElementById("errorMessage").innerText = "Usuário ou senha incorretos!";
            }
        });
    }
});

// Função para criar uma conta
function createAccount(nome, cpf, endereco, telefone, tipo) {
    let numeroConta = contas.length + 1;
    let novaConta = {
        numero: numeroConta,
        agencia: "0001",
        saldo: 0,
        titular: { nome, cpf, endereco, telefone },
        tipo
    };
    contas.push(novaConta);
    alert("Conta criada com sucesso! Número: " + numeroConta);
}

// Função para consultar conta
function getAccount(numero) {
    return contas.find(conta => conta.numero == numero);
}

// Função para remover conta
function deleteAccount(numero) {
    contas = contas.filter(conta => conta.numero != numero);
    alert("Conta removida com sucesso!");
}

// Função para creditar na conta
function creditAccount(numero, valor) {
    let conta = getAccount(numero);
    if (conta) {
        conta.saldo += valor;
        alert("Crédito realizado com sucesso!");
    }
}

// Função para debitar da conta
function debitAccount(numero, valor) {
    let conta = getAccount(numero);
    if (conta && conta.saldo >= valor) {
        conta.saldo -= valor;
        alert("Débito realizado com sucesso!");
    } else {
        alert("Saldo insuficiente!");
    }
}

// Função para render juros em conta poupança
function applyInterest(numero, taxa) {
    let conta = getAccount(numero);
    if (conta && conta.tipo === "poupança") {
        conta.saldo += conta.saldo * (taxa / 100);
        alert("Juros aplicados com sucesso!");
    } else {
        alert("Apenas contas poupança podem render juros!");
    }
}

// Função para listar todas as contas
function listAccounts() {
    console.table(contas);
}
