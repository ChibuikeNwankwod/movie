const API_KEY = "c64217bf43660888b9007fe20443481b";
const url = (newQuery) =>
  `https://api.themoviedb.org/3/${newQuery}?api_key=${API_KEY}&language=en-US`;

const image_url = "https://image.tmdb.org/t/p/w500";
const movieDiv = document.getElementById("movie");
const menuIcon = document.getElementById("menu-icon");
const menuContent = document.getElementById("sm-menu-content");

console.log(menuIcon, menuContent, movie);

menuIcon.addEventListener("click", () => {
  if (menuContent.classList.contains("left-[-100%]")) {
    menuContent.classList.remove("left-[-100%]");
    menuContent.classList.add("left-0");
  } else {
    menuContent.classList.remove("left-0");
    menuContent.classList.add("left-[-100%]");
  }
});

const fetchMovie = async (url) => {
  const daniel = await fetch(url);
  const data = await daniel.json();

  const movies = data.results;

  console.log(movies);

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.href = `./movie.html?id=${movie.id}?media_type=${movie.media_type}`;
    movieCard.innerHTML = `
        <div class="rounded-[11px] shadow-md">
            <img src="${image_url}${movie.poster_path}" alt="${movie.title}" />
            <a href="./movie.html?id=${movie.id}?media_type=${
      movie.media_type
    }" class="font-bold text-[orangered] py-4 px-2 text-[1.7rem]">${
      movie.original_title || movie.name
    }</a>
        </div>
        `;

    movieDiv.appendChild(movieCard);
  });
};

fetchMovie(url("trending/all/day"));
