const BASE_URL = "https://pokeapi.co/api/v2";

const refs = {
  list: document.querySelector(".list"),
  counter: document.querySelector(".sub-title"),
  input: document.querySelector(".searchbar"),
};

const pokemons = JSON.parse(localStorage.getItem("pokemons"));

if (!pokemons || pokemons.length === 0) {
  fetchPokemons().then((pokemons) => {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    refs.list.innerHTML = createListMarkup(pokemons);
  });
} else {
  refs.list.innerHTML = createListMarkup(pokemons);
}

refs.list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("card__btn")) {
    return;
  }

  const pokemons = JSON.parse(localStorage.getItem("pokemons"));

  const currentBtn = e.target.getAttribute("id");

  const index = pokemons.findIndex((el) => el.url === currentBtn);

  pokemons.splice(index, 1);

  localStorage.setItem("pokemons", JSON.stringify(pokemons));

  refs.list.innerHTML = createListMarkup(pokemons);
});

refs.input.addEventListener("input", (e) => {
  refs.list.innerHTML = createListMarkup(
    pokemons.filter((el) => el.name.includes(e.target.value))
  );
});

async function fetchPokemons() {
  const response = await fetch(`${BASE_URL}/pokemon`);
  const data = await response.json();

  return data.results;
}

function createListMarkup(data) {
  return data
    .map(
      (el) => `<li class="card">
        <h2 class="card__title">${el.name}</h2>
        <p class="card__url">${el.url}</p>
        <button id="${el.url}" class="card__btn">Delete</button>
      </li>`
    )
    .join("");
}
