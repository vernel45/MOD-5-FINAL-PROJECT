async function getMovies() {
  const response = await fetch("https://www.omdbapi.com/?apikey=2ade860f&s=marvel");
  const data = await response.json();
  console.log(data);
}

getMovies();