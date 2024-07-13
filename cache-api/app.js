const button = document.getElementById("fetchData");
const header = document.querySelector("header");
const image = document.querySelector("img");

const CACHE_KEY = "MY-POKE-CACHE-ID";

button.addEventListener("click", async () => {
  console.count("👀 Button clicked!");
  setLoadingStatus();
  const poke = await fetchPokeData({
    pokeId: randomPokeNumber(),
  });
  showCharacterData(poke);
});

function setLoadingStatus() {
  header.textContent = "loading...";
}

function randomPokeNumber() {
  return Math.floor(Math.random() * 151 + 1);
}

function showCharacterData(pokemon) {
  header.textContent = pokemon.name;
  loadPokemonImage(pokemon);
}

async function loadPokemonImage(pokemon) {
  const endpoint = pokemon.sprites.other["official-artwork"].front_default;
  const response =
    (await fetchFromCache(endpoint)) || (await fetchFromNetwork(endpoint));
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  image.src = imageUrl;
}

async function fetchPokeData({ pokeId }) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  console.log(`[fetchCharacterData] #${pokeId}`);
  const response =
    (await fetchFromCache(endpoint)) || (await fetchFromNetwork(endpoint));
  const pokemon = await response.json();
  return pokemon;
}

async function fetchFromNetwork(endpoint) {
  const response = await fetch(endpoint);
  if (response.ok) {
    addToCache(endpoint, response.clone());
    return response;
  }
  throw new Error(`Not able to request: ${endpoint}`);
}

async function fetchFromCache(endpoint) {
  const cache = await caches.open(CACHE_KEY);
  const response = await cache.match(endpoint);
  return response && response;
}

async function addToCache(key, response) {
  const cache = await caches.open(CACHE_KEY);
  cache.put(key, response);
}
