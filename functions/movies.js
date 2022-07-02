const { URL } = require("url");
const fetch = require("node-fetch");
// still using the movies from our own database
const movies = require("../data/movies");

const api = new URL("https://www.omdbapi.com/");
// add secret API key to the query string
api.searchParams.set("apikey", process.env.OMDB_API_KEY);

// we are fetching user rating info from OMDB, and insert it into each movie data
const promisesOfMovies = movies.map((movie) => {
  api.searchParams.set("i", movie.id);
  console.log(api)

  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      return {
        ...movie,
        scores: data.Ratings,
      };
    });
});

exports.handler = async () => {
  const moviesWithRatings = await Promise.all(promisesOfMovies);
  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
