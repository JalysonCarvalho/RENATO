// 1. Alerta ao carregar a página
window.addEventListener("load", function () {
    alert("Bem-vindo ao site do IFCE - Campus Boa Viagem!");
});

// 2. Aumentar/diminuir o tamanho do título ao clicar
const titulo = document.querySelector("h1, .titulo-principal");
if (titulo) {
    let grande = false;
    titulo.addEventListener("click", function () {
        if (!grande) {
            titulo.style.fontSize = "2.5rem";
        } else {
            titulo.style.fontSize = "";
        }
        grande = !grande;
    });
}

// 3. Criar botão "Exibir aviso" com toggle de parágrafo centralizado
const main = document.querySelector("main");
if (main) {
    const botao = document.createElement("button");
    botao.textContent = "Exibir aviso";
    botao.style.marginTop = "20px";
    botao.style.padding = "10px 20px";
    botao.style.backgroundColor = "#00586D";
    botao.style.color = "#fff";
    botao.style.border = "none";
    botao.style.borderRadius = "5px";
    botao.style.cursor = "pointer";

    let avisoCriado = false;
    let aviso;

    botao.addEventListener("click", function () {
        if (!avisoCriado) {
            aviso = document.createElement("div");
            aviso.textContent = "As inscrições para os cursos estão abertas!";
            aviso.style.position = "fixed";
            aviso.style.top = "50%";
            aviso.style.left = "50%";
            aviso.style.transform = "translate(-50%, -50%)";
            aviso.style.padding = "20px";
            aviso.style.backgroundColor = "#e0f7fa";
            aviso.style.border = "2px solid #0097a7";
            aviso.style.borderRadius = "8px";
            aviso.style.color = "#007c91";
            aviso.style.fontSize = "1.2rem";
            aviso.style.fontWeight = "bold";
            aviso.style.zIndex = "1000";
            aviso.id = "avisoCursos";

            document.body.appendChild(aviso);
            avisoCriado = true;
        } else {
            const avisoExistente = document.getElementById("avisoCursos");
            if (avisoExistente) {
                avisoExistente.remove();
                avisoCriado = false;
            }
        }
    });

    main.appendChild(botao);
}
// 4. Alterar conteúdo do rodapé com innerHTML (alternando texto)
const rodape = document.querySelector(".rodape");
if (rodape) {
    const mensagemOriginal = "Análise e Desenvolvimento de Sistemas<br>2024.2";
    const novaMensagem = "Todos os direitos reservados";

    // Cria o botão
    const botaoAlterarRodape = document.createElement("button");
    botaoAlterarRodape.textContent = "Alterar rodapé";
    botaoAlterarRodape.style.position = "absolute";
    botaoAlterarRodape.style.top = "10px";
    botaoAlterarRodape.style.left = "10px";
    botaoAlterarRodape.style.padding = "8px 16px";
    botaoAlterarRodape.style.backgroundColor = "#0194b9";
    botaoAlterarRodape.style.color = "#fff";
    botaoAlterarRodape.style.border = "none";
    botaoAlterarRodape.style.borderRadius = "5px";
    botaoAlterarRodape.style.cursor = "pointer";
    botaoAlterarRodape.style.fontFamily = "Montserrat, sans-serif";
    botaoAlterarRodape.style.zIndex = "10";

    let textoAlterado = false;

    botaoAlterarRodape.addEventListener("click", function () {
        rodapeContent.innerHTML = textoAlterado ? mensagemOriginal : novaMensagem;
        textoAlterado = !textoAlterado;
    });

    // Envolve o conteúdo do rodapé em uma div para manipular só o texto
    const rodapeContent = document.createElement("div");
    rodapeContent.innerHTML = mensagemOriginal;

    rodape.style.position = "relative"; // Para posicionar o botão dentro
    rodape.innerHTML = ""; // Limpa conteúdo antigo
    rodape.appendChild(botaoAlterarRodape);
    rodape.appendChild(rodapeContent);
}
// 5. Alterar atributo alt da imagem com setAttribute()

// Seleciona a primeira imagem da página (pode ajustar caso tenha mais imagens)
const imagemIFCE = document.querySelector("img");

if (imagemIFCE) {
    // Cria o campo de texto
    const inputAlt = document.createElement("input");
    inputAlt.type = "text";
    inputAlt.placeholder = "Digite a nova descrição da imagem";
    inputAlt.style.padding = "8px";
    inputAlt.style.marginTop = "1rem";
    inputAlt.style.width = "250px";
    inputAlt.style.borderRadius = "5px";
    inputAlt.style.border = "1px solid #ccc";
    inputAlt.style.fontFamily = "Montserrat, sans-serif";

    // Cria o botão
    const botaoAlt = document.createElement("button");
    botaoAlt.textContent = "Alterar descrição da imagem";
    
    botaoAlt.style.padding = "8px 12px";
    botaoAlt.style.backgroundColor = "#00586D";
    botaoAlt.style.color = "#fff";
    botaoAlt.style.border = "none";
    botaoAlt.style.borderRadius = "5px";
    botaoAlt.style.cursor = "pointer";
    botaoAlt.style.fontFamily = "Montserrat, sans-serif";

    // Insere os elementos após a imagem
    imagemIFCE.insertAdjacentElement("afterend", inputAlt);
    inputAlt.insertAdjacentElement("afterend", botaoAlt);

    // Ação do botão
    botaoAlt.addEventListener("click", function () {
        const novoAlt = inputAlt.value.trim();
        if (novoAlt !== "") {
            imagemIFCE.setAttribute("alt", novoAlt);
            alert("A descrição da imagem foi atualizada!");
        } else {
            alert("Por favor, digite uma descrição válida.");
        }
    });
}
function alterarDescricao() {
    var novaDescricao = document.getElementById("novoAlt").value;
    var imagem = document.querySelector(".image"); // ou o seletor correto
    if (novaDescricao !== "") {
        imagem.setAttribute("alt", novaDescricao);
        alert("Descrição alterada com sucesso!");
    } else {
        alert("Digite uma nova descrição!");
    }
}

// 6.1. Criar botão dinamicamente
var botaoNoturno = document.createElement("button");
botaoNoturno.textContent = "Ativar modo noturno";

// 6.2. Estilização do botão
botaoNoturno.style.position = "absolute";
botaoNoturno.style.top = "10px";
botaoNoturno.style.right = "10px";
botaoNoturno.style.padding = "8px 15px";
botaoNoturno.style.border = "none";
botaoNoturno.style.borderRadius = "5px";
botaoNoturno.style.cursor = "pointer";
botaoNoturno.style.backgroundColor = "#005b6e";
botaoNoturno.style.color = "white";
botaoNoturno.style.zIndex = "1000";

// 6.3. Adicionar o botão ao cabeçalho
var header = document.querySelector("header");
header.style.position = "relative";
header.appendChild(botaoNoturno);

// 6.4. Alternância de modo noturno
var modoEscuroAtivo = false;

botaoNoturno.addEventListener("click", function () {
    modoEscuroAtivo = !modoEscuroAtivo;

    // Alterna a classe no body
    document.body.classList.toggle("modo-escuro");

    // Atualiza texto e cor do botão
    if (modoEscuroAtivo) {
        botaoNoturno.textContent = "Desativar modo noturno";
        botaoNoturno.style.backgroundColor = "#333";
    } else {
        botaoNoturno.textContent = "Ativar modo noturno";
        botaoNoturno.style.backgroundColor = "#005b6e";
    }
});



// 10.1. Selecionar o botão "Ir para o topo"
var botaoTopo = document.getElementById("botaoTopo");

// 10.2. Adicionar evento de rolagem na janela
window.addEventListener("scroll", function () {
    // 10.3. Calcular o total de rolagem possível (altura total - altura da tela)
    var scrollTotal = document.documentElement.scrollHeight - window.innerHeight;

    // 10.4. Verificar quanto foi rolado até o momento
    var scrollAtual = window.scrollY;

    // 10.5. Mostrar botão se estiver nos últimos 400px da página
    if (scrollAtual > scrollTotal - 400) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

// 10.6. Adicionar evento de clique para rolar até o topo suavemente
botaoTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
