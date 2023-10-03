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

export default createListMarkup;
