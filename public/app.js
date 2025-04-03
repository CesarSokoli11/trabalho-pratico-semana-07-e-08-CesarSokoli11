document.addEventListener("DOMContentLoaded", function () {
    carregarFilmes();
    atualizarFavoritos();
});

// 🎬 Lista de filmes (simulando um JSON)
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
    let container = document.getElementById("filmes-container");
    container.innerHTML = ""; 

    filmes.forEach(filme => {
        let card = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card bg-dark text-white" onclick="irParaDetalhes('${filme.titulo}', '${filme.imagem}', '${filme.descricao}')">
                    <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text">${filme.descricao}</p>
                        <button class="btn btn-warning" onclick="event.stopPropagation(); toggleFavorito('${filme.titulo}')">⭐ Favorito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 🔗 Redirecionar para detalhes
function irParaDetalhes(titulo, imagem, descricao) {
    const url = `detalhes.html?titulo=${encodeURIComponent(titulo)}&imagem=${encodeURIComponent(imagem)}&descricao=${encodeURIComponent(descricao)}`;
    window.location.href = url;
}

// 🟡 Menu lateral responsivo
document.getElementById("menu-icon").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
});

// 🔍 Filtro de busca
document.getElementById("search").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let filmes = document.querySelectorAll(".card");

    filmes.forEach(filme => {
        let title = filme.querySelector(".card-title").textContent.toLowerCase();
        filme.style.display = title.includes(searchValue) ? "block" : "none";
    });
});

// ⭐ Adicionar/remover favoritos
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

// 🔄 Atualizar a lista de favoritos
function atualizarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let lista = document.getElementById("favoritos-lista");

    if (lista) {
        lista.innerHTML = favoritos.length ? favoritos.map(filme => `<li>${filme}</li>`).join("") : "<li>Nenhum favorito</li>";
    }
}

// 🎞 Efeito de "elevação" ao passar o mouse nos filmes
document.addEventListener("mouseover", function (event) {
    if (event.target.closest(".card")) {
        event.target.closest(".card").style.transform = "scale(1.05)";
        event.target.closest(".card").style.transition = "0.3s";
    }
});

document.addEventListener("mouseout", function (event) {
    if (event.target.closest(".card")) {
        event.target.closest(".card").style.transform = "scale(1)";
    }
});
