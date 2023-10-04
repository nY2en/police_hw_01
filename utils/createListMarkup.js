function createListMarkup(data) {
  return data
    .map(
      (el) => `<tr>
      <td class="table__title">${el.name}</td>
      <td>${el.url}</td>
      <td><button id="${el.url}" class="table__btn">Delete</button></td>
    </tr>`
    )
    .join("");
}

export default createListMarkup;
