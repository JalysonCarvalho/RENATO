let contas = JSON.parse(localStorage.getItem("contas")) || [];

/**
 * Exibe mensagens no painel de mensagens.
 */
function exibirMensagem(mensagem) {
    const logMensagens = document.getElementById("logMensagens");
    const novaMensagem = document.createElement("p");
    novaMensagem.textContent = mensagem;
    logMensagens.appendChild(novaMensagem);
}

/**
 * Alterna para a tela de login.
 */
function entrarSistema() {
    document.getElementById("telaInicial").style.display = "none";
    document.getElementById("login").style.display = "block";
}

/**
 * Simula login.
 */
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("menu").style.display = "block";
        exibirMensagem("Login realizado com sucesso!");
    } else {
        exibirMensagem("Usuário ou senha inválidos.");
    }
}

/**
 * Exibe tela de operação.
 */
function mostrarTela(operacao) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("operacoes").style.display = "block";

    const titulo = document.getElementById("tituloOperacao");
    const formulario = document.getElementById("conteudoFormulario");

    formulario.innerHTML = "";
    switch (operacao) {
        case "criarConta":
            titulo.textContent = "Criar Conta";
            formulario.innerHTML = `
                <input type="text" id="numeroConta" placeholder="Número da Conta">
                <input type="text" id="agencia" placeholder="Agência">
                <input type="text" id="titular" placeholder="Titular">
                <input type="number" id="saldo" placeholder="Saldo Inicial">
                <select id="tipo">
                    <option value="Corrente">Corrente</option>
                    <option value="Poupança">Poupança</option>
                </select>
            `;
            break;
        case "creditar":
            titulo.textContent = "Creditar";
            formulario.innerHTML = `
                <input type="text" id="numeroCredito" placeholder="Número da Conta">
                <input type="number" id="valorCredito" placeholder="Valor a Creditar">
            `;
            break;
        case "debitar":
            titulo.textContent = "Debitar";
            formulario.innerHTML = `
                <input type="text" id="numeroDebito" placeholder="Número da Conta">
                <input type="number" id="valorDebito" placeholder="Valor a Debitar">
            `;
            break;
        case "renderJuros":
            titulo.textContent = "Render Juros";
            formulario.innerHTML = `
                <input type="text" id="numeroJuros" placeholder="Número da Conta">
                <input type="number" id="taxaJuros" placeholder="Taxa de Juros (%)">
            `;
            break;
        case "transferir":
            titulo.textContent = "Efetuar Transferência";
            formulario.innerHTML = `
                <input type="text" id="contaOrigem" placeholder="Conta de Origem">
                <input type="text" id="contaDestino" placeholder="Conta de Destino">
                <input type="number" id="valorTransferencia" placeholder="Valor a Transferir">
            `;
            break;
    }

    document.getElementById("formOperacao").onsubmit = function (e) {
        e.preventDefault();
        executarOperacao(operacao);
    };
}

/**
 * Executa a operação selecionada.
 */
function executarOperacao(operacao) {
    switch (operacao) {
        case "criarConta":
            const novaConta = {
                numero: document.getElementById("numeroConta").value,
                agencia: document.getElementById("agencia").value,
                titular: document.getElementById("titular").value,
                saldo: parseFloat(document.getElementById("saldo").value),
                tipo: document.getElementById("tipo").value,
            };
            contas.push(novaConta);
            localStorage.setItem("contas", JSON.stringify(contas));
            exibirMensagem("Conta criada com sucesso!");
            break;
        case "creditar":
            const numeroCredito = document.getElementById("numeroCredito").value;
            const valorCredito = parseFloat(document.getElementById("valorCredito").value);
            const contaCredito = contas.find(c => c.numero === numeroCredito);

            if (contaCredito) {
                contaCredito.saldo += valorCredito;
                localStorage.setItem("contas", JSON.stringify(contas));
                exibirMensagem(`Valor de ${valorCredito} creditado na conta ${numeroCredito}.`);
            } else {
                exibirMensagem("Conta não encontrada.");
            }
            break;
        case "debitar":
            const numeroDebito = document.getElementById("numeroDebito").value;
            const valorDebito = parseFloat(document.getElementById("valorDebito").value);
            const contaDebito = contas.find(c => c.numero === numeroDebito);

            if (contaDebito && contaDebito.saldo >= valorDebito) {
                contaDebito.saldo -= valorDebito;
                localStorage.setItem("contas", JSON.stringify(contas));
                exibirMensagem(`Valor de ${valorDebito} debitado da conta ${numeroDebito}.`);
            } else if (!contaDebito) {
                exibirMensagem("Conta não encontrada.");
            } else {
                exibirMensagem("Saldo insuficiente para realizar o débito.");
            }
            break;
        case "renderJuros":
            const numeroJuros = document.getElementById("numeroJuros").value;
            const taxaJuros = parseFloat(document.getElementById("taxaJuros").value) / 100;
            const contaJuros = contas.find(c => c.numero === numeroJuros);

            if (contaJuros && contaJuros.tipo.toLowerCase() === "poupança") {
                contaJuros.saldo += contaJuros.saldo * taxaJuros;
                localStorage.setItem("contas", JSON.stringify(contas));
                exibirMensagem(`Juros aplicados! Saldo atual da conta ${numeroJuros}: ${contaJuros.saldo.toFixed(2)}`);
            } else if (!contaJuros) {
                exibirMensagem("Conta não encontrada.");
            } else {
                exibirMensagem("Apenas contas do tipo 'Poupança' podem render juros.");
            }
            break;
        case "transferir":
            const contaOrigem = document.getElementById("contaOrigem").value;
            const contaDestino = document.getElementById("contaDestino").value;
            const valorTransferencia = parseFloat(document.getElementById("valorTransferencia").value);

            const origem = contas.find(c => c.numero === contaOrigem);
            const destino = contas.find(c => c.numero === contaDestino);

            if (origem && destino && origem.saldo >= valorTransferencia) {
                origem.saldo -= valorTransferencia;
                destino.saldo += valorTransferencia;
                localStorage.setItem("contas", JSON.stringify(contas));
                exibirMensagem(`Transferência de ${valorTransferencia} realizada da conta ${contaOrigem} para ${contaDestino}.`);
            } else if (!origem || !destino) {
                exibirMensagem("Uma ou ambas as contas não foram encontradas.");
            } else {
                exibirMensagem("Saldo insuficiente para realizar a transferência.");
            }
            break;
    }
    voltarMenu();
}

/**
 * Lista todas as contas cadastradas.
 */
function listarContas() {
    const logMensagens = document.getElementById("logMensagens");
    logMensagens.innerHTML = ""; // Limpa as mensagens anteriores

    if (contas.length === 0) {
        exibirMensagem("Nenhuma conta cadastrada no sistema.");
    } else {
        contas.forEach(c => {
            exibirMensagem(`Conta: ${c.numero}, Titular: ${c.titular}, Saldo: R$${c.saldo.toFixed(2)}`);
        });
    }
}

/**
 * Retorna ao menu principal.
 */
function voltarMenu() {
    document.getElementById("operacoes").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

/**
 * Sai do sistema e retorna à tela inicial.
 */
function sair() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("telaInicial").style.display = "block";
    exibirMensagem("Você saiu do sistema.");
}
