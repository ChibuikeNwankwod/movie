const movieId = window.location.search.split("=")[1].split("?")[0];
const mediaType = window.location.search.split("=")[2];
const API_KEY = "c64217bf43660888b9007fe20443481b";
const url = (newQuery) =>
  `https://api.themoviedb.org/3/${newQuery}?api_key=${API_KEY}&language=en-US`;

// DOM Elements

const details = document.querySelector("#details");
const similarMovie = document.getElementById("similar");
const image_url = "https://image.tmdb.org/t/p/w500";
const menuIcon = document.getElementById("menu-icon");
const menuContent = document.getElementById("sm-menu-content");
const loader = document.querySelector("#loader");

menuIcon.addEventListener("click", () => {
  if (menuContent.classList.contains("left-[-100%]")) {
    menuContent.classList.remove("left-[-100%]");
    menuContent.classList.add("left-0");
  } else {
    menuContent.classList.remove("left-0");
    menuContent.classList.add("left-[-100%]");
  }
});

const getSimilarMovies = async () => {
  const response =
    mediaType == "movie"
      ? await fetch(url(`/movie/${movieId}/similar`))
      : await fetch(url(`/tv/${movieId}/similar`));

  const data = await response.json();

  data.results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.href = `./movie.html?id=${movie.id}?media_type=${movie.media_type}`;
    movieCard.innerHTML = `
        <div class="rounded-[12px] shadow-md">
            <img src="${image_url}${movie.poster_path}" alt="${movie.title}" />
            <a href="./movie.html?id=${movie.id}?media_type=${
      movie.media_type
    }" class="font-bold text-[orangered] py-4 px-2 text-[1.7rem]">${
      movie.original_title || movie.name
    }</a>

        </div>
        `;

    similarMovie.appendChild(movieCard);
  });
};

getSimilarMovies();

const fetchMovie = async (url) => {
  try {
    const daniel = await fetch(url);
    const data = await daniel.json();

    console.log(data);
    if (data) {
      loader.style.display = "none";
      details.innerHTML = `
                          <img class="mx-auto w-full" src="https://image.tmdb.org/t/p/w500/${
                            data.poster_path
                          }" alt="" />
                          <div  class="flex flex-col items-left bg-[white] px-[1rem] ">
                            <h1 class="font-bold text-[3rem] text-[orangered]"> ${
                              data.title || data.name
                            } </h1>

                            <p class="text-[2.2rem] text-[black]"> ${
                              data.overview
                            } </p>

                            <p class="text-[2.2rem] text-gray-500 pt-[2rem]"> Release Date: ${
                              data.release_date
                            } </p>

                            <p class="text-[2.2rem] text-gray-500 pt-[1.2rem]"> Vote Average: ${
                              data.vote_average
                            } </p>

                            <p class="text-[2.2rem] text-gray-500 pt-[1.2rem]"> Original language: ${
                              data.original_language
                            } </p>
                            <p class="text-[2.2rem] text-gray-500 pt-[1.2rem]"> Genre: ${data.genres.map(
                              (genre) => ` ${genre.name}`
                            )} </p>
                            



                          </div>
                          `;
    }
  } catch (err) {}
};

if (mediaType == "tv") {
  fetchMovie(url(`tv/${movieId}`));
} else {
  fetchMovie(url(`movie/${movieId}`));
}
