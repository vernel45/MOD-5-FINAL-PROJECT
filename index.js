const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const nameWrapper = document.querySelector(".searchName");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    results.innerHTML = "<h2>Please enter a movie title.</h2>";
    return;
  }

  getMovies(searchTerm);
  
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      results.innerHTML = "<h2> Please add a movie title</h2>";
    }
    getMovies(searchTerm);
  }
});

async function getMovies(searchTerm) {
  nameWrapper.innerHTML = searchTerm;
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=2ade860f&s=${searchTerm}`,
  );

  const data = await response.json();
  if (data.Response === "False") {
    results.innerHTML = `<h2>${data.Error}</h2>`;
    return;
  }
  console.log(data);

 const movies = data.Search;

results.innerHTML = movies
  .map((movie) => {
    const poster =
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://placehold.co/300x450?text=No+Image";

    return `
      <div class="movie">
        <img
          src="${poster}"
          alt="${movie.Title}"
          onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=No+Image';"
        />
        <h3>${movie.Title}</h3>
        <h4>${movie.Year}</h4>
        <button> Learn More</button>
      </div>
    `;
  }).slice(0, 6)  .join("");
}
