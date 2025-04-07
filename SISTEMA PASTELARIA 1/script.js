let produtos = [
    { nome: "Pastel de Carne", preco: 6.00, imagem: "img/pastel de carne.jpeg" },
    { nome: "Pastel de Frango", preco: 5.50, imagem: "img/pastel de frango.jpeg" },
    { nome: "Pastel de Queijo", preco: 5.00, imagem: "img/pastel de queijo.jpeg" },
    { nome: "Coxinha", preco: 3.50, imagem: "img/coxinha-para-vender.jpg" },
    { nome: "Empada de Frango", preco: 4.00, imagem: "img/empada de frango.jpeg" },
    { nome: "Refrigerante", preco: 3.00, imagem: "img/refrigerantes.jpeg" }
];
let produtosSelecionados = [];
let totalComTaxa = 0; // Variável para armazenar o total com taxa de 10%

function carregarProdutos() {
    let container = document.getElementById("productContainer");
    container.innerHTML = "";
    produtos.forEach(produto => {
        container.innerHTML += `
        <div class="product-card">
            <img class="product-img" src="${produto.imagem}" alt="${produto.nome}">
            <div class="product-info">
                <p class="product-name">${produto.nome}</p>
                <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
                <div class="product-actions">
                    <button onclick="adicionarProduto('${produto.nome}', ${produto.preco})">Adicionar</button>
                    <button onclick="removerProduto('${produto.nome}')">Remover</button>
                </div>
            </div>
        </div>`;
    });
}

function adicionarProduto(nome, preco) {
    let produtoExistente = produtosSelecionados.find(produto => produto.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        produtosSelecionados.push({ nome, preco, quantidade: 1 });
    }
    exibirResumo();
}

function removerProduto(nome) {
    let produtoIndex = produtosSelecionados.findIndex(produto => produto.nome === nome);
    if (produtoIndex !== -1) {
        let produto = produtosSelecionados[produtoIndex];
        if (produto.quantidade > 1) {
            produto.quantidade -= 1;
        } else {
            produtosSelecionados.splice(produtoIndex, 1);
        }
    }
    exibirResumo();
}

function exibirResumo() {
    let orderDetails = document.getElementById("orderDetails");
    let totalPrice = 0;
    orderDetails.innerHTML = '';
    produtosSelecionados.forEach(produto => {
        orderDetails.innerHTML += `<p>${produto.quantidade}x ${produto.nome} - R$ ${produto.preco.toFixed(2)} cada - Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</p>`;
        totalPrice += produto.preco * produto.quantidade;
    });

    document.getElementById("totalPrice").innerHTML = `Total: R$ ${totalPrice.toFixed(2)}`;
}

function finalizarPedido() {
    if (produtosSelecionados.length === 0) {
        alert("Nenhum produto foi selecionado.");
        return;
    }

    // Calcula o total inicial
    let totalPrice = 0;
    produtosSelecionados.forEach(produto => {
        totalPrice += produto.preco * produto.quantidade;
    });

    // Exibe o total inicial
    document.getElementById("orderDetails").innerHTML += `
        <p><strong>Total da compra: R$ ${totalPrice.toFixed(2)}</strong></p>
        <p>Você gostaria de adicionar uma taxa de 10% ao total?</p>
        <button onclick="adicionarTaxa(${totalPrice})">Sim, adicionar 10%</button>
        <button onclick="finalizarSemTaxa(${totalPrice})">Não, continuar sem a taxa</button>
    `;
    
    // Desabilita o botão de fazer pedido
    document.getElementById("startOrderButton").disabled = true;
}

function adicionarTaxa(totalPrice) {
    // Aplica a taxa de 10%
    totalComTaxa = totalPrice * 1.1;

    // Atualiza o total na tela sem apagar o conteúdo
    document.getElementById("orderDetails").innerHTML += `
        <p><strong>Total com 10%: R$ ${totalComTaxa.toFixed(2)}</strong></p>
    `;
    document.getElementById("totalPrice").innerHTML = `Total com 10%: R$ ${totalComTaxa.toFixed(2)}`;
}

function finalizarSemTaxa(totalPrice) {
    // Atualiza o total sem taxa
    totalComTaxa = totalPrice;

    // Atualiza o total na tela sem apagar o conteúdo
    document.getElementById("orderDetails").innerHTML += `
        <p><strong>Total sem taxa: R$ ${totalComTaxa.toFixed(2)}</strong></p>
    `;
    document.getElementById("totalPrice").innerHTML = `Total: R$ ${totalComTaxa.toFixed(2)}`;
}

function exibirConta() {
    let resultadoDiv = document.getElementById("orderDetails");
    resultadoDiv.innerHTML = "<h3>Conta Detalhada</h3>";

    // Exibe os itens do pedido
    for (let i = 0; i < produtosSelecionados.length; i++) {
        let item = produtosSelecionados[i].quantidade + "x " + produtosSelecionados[i].nome + " - R$ " + produtosSelecionados[i].preco + " cada - Total: R$ " + (produtosSelecionados[i].preco * produtosSelecionados[i].quantidade);
        resultadoDiv.innerHTML += `<p>${item}</p>`;
    }

    // Exibe o total
    resultadoDiv.innerHTML += `<p><strong>Total da compra: R$ ${totalComTaxa.toFixed(2)}</strong></p>`;

    // Limpa os produtos selecionados
    produtosSelecionados = [];
    exibirResumo();

    // Habilita novamente o botão de fazer novo pedido
    document.getElementById("startOrderButton").disabled = false;
    document.getElementById("startOrderButton").innerText = "Fazer Novo Pedido";
}

function novoPedido() {
    // Limpa o pedido anterior
    produtosSelecionados = [];
    document.getElementById("orderDetails").innerHTML = "";
    document.getElementById("totalPrice").innerHTML = "Total: R$ 0,00";
    carregarProdutos();
    // Habilita o botão de fazer pedido novamente
    document.getElementById("startOrderButton").disabled = false;
    document.getElementById("startOrderButton").innerText = "Fazer Pedido";
}

window.onload = carregarProdutos;

function finalizarPedido() {
    if (produtosSelecionados.length === 0) {
        alert("Nenhum produto foi selecionado.");
        return;
    }

    // Calcula o total inicial
    let totalPrice = 0;
    produtosSelecionados.forEach(produto => {
        totalPrice += produto.preco * produto.quantidade;
    });

    // Exibe o total inicial
    document.getElementById("orderDetails").innerHTML += `
        <p><strong>Total da compra: R$ ${totalPrice.toFixed(2)}</strong></p>
        <p>Você gostaria de adicionar uma taxa de 10% ao total?</p>
        <button onclick="adicionarTaxa(${totalPrice})">Sim, adicionar 10%</button>
        <button onclick="finalizarSemTaxa(${totalPrice})">Não, continuar sem a taxa</button>
    `;
    
    // Desabilita o botão de fazer pedido
    document.getElementById("startOrderButton").disabled = true;
}

function adicionarTaxa(totalPrice) {
    // Aplica a taxa de 10%
    let totalComTaxa = totalPrice * 1.1;

    // Salva os dados no localStorage
    localStorage.setItem("dadosCompra", JSON.stringify({
        produtos: produtosSelecionados,
        total: totalPrice,
        totalComTaxa: totalComTaxa
    }));

    // Redireciona para a página do cupom fiscal
    window.location.href = "cupom.html";
}

function finalizarSemTaxa(totalPrice) {
    // Finaliza sem a taxa
    localStorage.setItem("dadosCompra", JSON.stringify({
        produtos: produtosSelecionados,
        total: totalPrice,
        totalComTaxa: totalPrice
    }));

    // Redireciona para a página do cupom fiscal
    window.location.href = "cupom.html";
}
