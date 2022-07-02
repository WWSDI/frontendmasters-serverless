const movies = require("../data/movies");

exports.handler = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters;
  const movie = movies.find((movie) => movie.id === id);

  if (!movie)
    return {
      statusCode: 404,
      body: "Movie Not Found! Maybe you have provided the wrong id?",
    };

  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
};
 