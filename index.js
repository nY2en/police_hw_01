const BASE_URL = "https://pokeapi.co/api/v2";

const refs = {
  list: document.querySelector(".list"),
  counter: document.querySelector(".sub-title"),
  input: document.querySelector(".searchbar"),
};

const pokemons = JSON.parse(localStorage.getItem("pokemons"));

if (!pokemons) {
  fetchPokemons().then((data) => {
    localStorage.setItem("pokemons", JSON.stringify(data));

    handleListFill(data);
    counterUpdate(data);

    return;
  });
} else {
  handleListFill(pokemons);
  counterUpdate(pokemons);
}

refs.input.addEventListener("input", (e) => {
  const pokemons = JSON.parse(localStorage.getItem("pokemons"));

  const filteredList = pokemons.filter((el) =>
    el.name.includes(e.target.value)
  );

  if (filteredList.length === 0) {
    refs.list.innerHTML = "Not found";
    return;
  }

  handleListFill(filteredList);
});

refs.list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("card__btn")) {
    return;
  }

  const pokemons = JSON.parse(localStorage.getItem("pokemons"));

  const currentBtn = e.target.getAttribute("id");

  const index = pokemons.findIndex((el) => el.url === currentBtn);

  pokemons.splice(index, 1);

  localStorage.setItem("pokemons", JSON.stringify(pokemons));

  handleListFill(pokemons);

  counterUpdate(pokemons);

  if (pokemons.length === 0) {
    localStorage.removeItem("pokemons");
  }
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
function handleListFill(data) {
  refs.list.innerHTML = createListMarkup(data);
}

function counterUpdate(pokemons) {
  refs.counter.textContent = `${pokemons.length} users`;
}
