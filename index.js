const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  getMovies(searchInput.value);
});

async function getMovies(searchTerm) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=2ade860f&s=${searchTerm}`,
  );

  const data = await response.json();
  console.log(data.Search);

  const movies = data.Search;

  results.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    const poster =
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";
        console.log(movie.Title, poster);

    movieCard.innerHTML = `
<img 
src="${poster}"
  alt="${movie.Title}"
  onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=No+Image';"
/>
<h3>${movie.Title}</h3>
<p>${movie.Year}</p>
  `;

    results.appendChild(movieCard);
  });
}