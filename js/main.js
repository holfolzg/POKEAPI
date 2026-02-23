const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

let todosLosPokemon = [];

async function fetchPokemons() {
    const promesas = [];

    for (let i = 1; i <= 151; i++) {
        promesas.push(fetch(URL + i).then(res => res.json()));
    }

    try {

        todosLosPokemon = await Promise.all(promesas);

        renderizarLista(todosLosPokemon);
    } catch (error) {
        console.error("Error cargando la PokéAPI:", error);
    }
}

function renderizarLista(lista) {
    listaPokemon.innerHTML = "";
    lista.forEach(poke => mostrarPokemon(poke));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`);
    tipos = tipos.join('');
    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>

        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipo">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height / 10}m</p>
                <p class="stat">${poke.weight / 10}kg</p>
            </div>
        </div>`;
    
    listaPokemon.append(div);
}
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    if (botonId === "ver-todos") {
        renderizarLista(todosLosPokemon);
    } else {
        const filtrados = todosLosPokemon.filter(poke => {
            const tipos = poke.types.map(t => t.type.name);
            return tipos.includes(botonId);
        });
        renderizarLista(filtrados);
    }
}));
fetchPokemons();