const { query } = require("./util/hasura");

exports.handler = async (event) => {
  // console.log("🌸", event.body);

  const result = await query({
    query: `
    mutation MyMutation($id: String!, $poster: String!, $tagline: String!, $title: String!) {
  insert_movies_one(object: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
    id
    poster
    tagline
    title
  }
}`,
    variables: JSON.parse(event.body),
  });
  // console.log("🌸", result);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
