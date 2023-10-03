const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchPokemons() {
  const response = await fetch(`${BASE_URL}/pokemon`);
  const data = await response.json();

  return data.results;
}

export default fetchPokemons;
