const url = "https://rickandmortyapi.com/api/character";
const container = document.getElementById("characters");
const searchInput = document.getElementById("search");

let charactersData = []; 

async function getData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    charactersData = result.results;

    displayCharacters(charactersData);
  } catch (error) {
    console.error(error.message);
    container.innerHTML = "<p>Gagal memuat data</p>";
  }
}

function displayCharacters(data) {
  container.innerHTML = "";

  data.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.status} - ${character.species}</p>
    `;

    container.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filteredData = charactersData.filter(character =>
    character.name.toLowerCase().includes(keyword)
  );

  displayCharacters(filteredData);
});

getData();
