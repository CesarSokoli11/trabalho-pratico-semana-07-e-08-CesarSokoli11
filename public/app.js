document.addEventListener("DOMContentLoaded", function () {
    carregarFilmes();
    atualizarFavoritos();
    configurarBusca();

    // Ativar menu hambúrguer
    document.getElementById("menu-icon").addEventListener("click", function () {
        document.getElementById("sidebar").classList.toggle("active");
    });
});

// 🎬 Lista de filmes
const filmes = [
    {
        titulo: "Brad Pitt F1",
        imagem: "formula.jpg",
        descricao: "F1 é um filme de drama esportivo dirigido por Joseph Kosinski e estrelado por Brad Pitt como Sonny Hayes, um ex-piloto de Fórmula 1 que retorna às pistas após um grave acidente nos anos 1990."
    },
    {
        titulo: "Capitão América: O Admirável Mundo Novo",
        imagem: "capitaoamerica.webp",
        descricao: "Sam Wilson (Anthony Mackie) assume o manto do Capitão América após os eventos de Falcão e o Soldado Invernal. Envolvido em um incidente internacional, ele deve desvendar uma conspiração global."
    },
    {
        titulo: "Último Alvo",
        imagem: "ultimoalvo.webp",
        descricao: "Liam Neeson interpreta um ex-gângster que, após ser diagnosticado com uma doença terminal, busca se reconciliar com seus filhos e corrigir erros do passado."
    },
    {
        titulo: "Branca de Neve",
        imagem: "brancadeneve.jpeg",
        descricao: "Branca de Neve (Rachel Zegler) foge para a floresta após sua madrasta, a Rainha Má (Gal Gadot), ordenar sua morte por inveja de sua beleza."
    }
];

// 🟢 Carregar filmes na página
function carregarFilmes() {
    const container = document.getElementById("filmes-container");
    container.innerHTML = "";

    filmes.forEach(filme => {
        const card = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card bg-dark text-white filme-card">
                    <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text">${filme.descricao}</p>
                        <button class="btn btn-warning favoritar-btn" data-titulo="${filme.titulo}">⭐ Favorito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });

    // Eventos para favoritos
    document.querySelectorAll(".favoritar-btn").forEach(botao => {
        botao.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleFavorito(this.dataset.titulo);
        });
    });

    // Eventos de clique nos cards
    document.querySelectorAll(".filme-card").forEach(card => {
        card.addEventListener("click", function () {
            const titulo = this.querySelector(".card-title").textContent;
            const filme = filmes.find(f => f.titulo === titulo);
            if (filme) {
                irParaDetalhes(filme.titulo, filme.imagem, filme.descricao);
            }
        });
    });
}

// 🔗 Redirecionar para detalhes
function irParaDetalhes(titulo, imagem, descricao) {
    const url = `detalhes.html?titulo=${encodeURIComponent(titulo)}&imagem=${encodeURIComponent(imagem)}&descricao=${encodeURIComponent(descricao)}`;
    window.location.href = url;
}

// 🔍 Busca de filmes
function configurarBusca() {
    const botaoBusca = document.getElementById("buscar-filmes");
    const barraPesquisa = document.getElementById("search-bar");
    const inputPesquisa = document.getElementById("search-input");
    const listaResultados = document.getElementById("search-results");

    botaoBusca.addEventListener("click", function (e) {
        e.preventDefault();
        barraPesquisa.classList.toggle("hidden");
        barraPesquisa.classList.toggle("show");

        inputPesquisa.value = "";
        listaResultados.innerHTML = "";
        inputPesquisa.focus();
    });

    inputPesquisa.addEventListener("input", function () {
        const termo = inputPesquisa.value.toLowerCase();
        listaResultados.innerHTML = "";

        const filmesFiltrados = filmes.filter(filme =>
            filme.titulo.toLowerCase().includes(termo)
        );

        filmesFiltrados.forEach(filme => {
            const item = document.createElement("li");
            item.textContent = filme.titulo;
            item.addEventListener("click", function () {
                inputPesquisa.value = filme.titulo;
                listaResultados.innerHTML = "";
            });
            listaResultados.appendChild(item);
        });
    });
}

// ⭐ Favoritos
function toggleFavorito(titulo) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(titulo)) {
        favoritos = favoritos.filter(filme => filme !== titulo);
    } else {
        favoritos.push(titulo);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    atualizarFavoritos();
}

// 🔄 Atualizar favoritos
function atualizarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const lista = document.getElementById("favoritos-lista");

    if (lista) {
        lista.innerHTML = favoritos.length
            ? favoritos.map(filme => `<li>${filme}</li>`).join("")
            : "<li>Nenhum favorito</li>";
    }
}

// 🎞 Hover nos cards
document.addEventListener("mouseover", function (event) {
    const card = event.target.closest(".filme-card");
    if (card) {
        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";
    }
});

document.addEventListener("mouseout", function (event) {
    const card = event.target.closest(".filme-card");
    if (card) {
        card.style.transform = "scale(1)";
    }
});
