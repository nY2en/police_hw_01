import fetchPokemons from "./utils/fetchPokemons.js";
import createListMarkup from "./utils/createListMarkup.js";

const refs = {
  list: document.querySelector(".list"),
  counter: document.querySelector(".sub-title"),
  input: document.querySelector(".searchbar"),
};

if (!localStorage.getItem("pokemons")) {
  await fetchPokemons().then((data) => {
    localStorage.setItem("pokemons", JSON.stringify(data));
  });
}

const pokemons = JSON.parse(localStorage.getItem("pokemons"));

handleListFill(pokemons);
counterUpdate(pokemons);

refs.input.addEventListener("input", (e) => {
  const filteredList = filter(pokemons, e.target.value.trim());

  if (filteredList.length === 0) {
    refs.list.innerHTML = "Not found";
    counterUpdate([]);
    return;
  }

  handleListFill(filteredList);

  counterUpdate(filteredList);
});

refs.list.addEventListener("click", (e) => {
  if (e.target.classList.contains("table__btn")) {
    const currentBtn = e.target.getAttribute("id");

    const index = pokemons.findIndex((el) => el.url === currentBtn);

    pokemons.splice(index, 1);

    localStorage.setItem("pokemons", JSON.stringify(pokemons));

    handleListFill(filter(pokemons, refs.input.value));

    counterUpdate(filter(pokemons, refs.input.value));
  }

  if (e.target.classList.contains("table__title")) {
    refs.input.value = e.target.textContent;
  }

  if (pokemons.length === 0) {
    localStorage.removeItem("pokemons");
  }
});

function handleListFill(data) {
  refs.list.innerHTML = createListMarkup(data);
}

function counterUpdate(pokemons) {
  refs.counter.textContent = `${pokemons.length} users`;
}

function filter(pokemons, value) {
  return pokemons.filter((el) => el.name.includes(value.toLowerCase()));
}
