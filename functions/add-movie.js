const { query: gqlQuery } = require("./util/hasura");

const addMovieQuery = async (event) => {
  const result = await gqlQuery({
    query: `
        mutation MyMutation(
          $id: String!
          $poster: String!
          $tagline: String!
          $title: String!
        ) {
          insert_movies_one(
            object: { id: $id, poster: $poster, tagline: $tagline, title: $title }
          ) {
            id
            poster
            tagline
            title
          }
        }
      `,
    variables: JSON.parse(event.body),
  });
  // console.log("🌸", result);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
const test401Error = (isLoggedIn, roles) => {
  if (!isLoggedIn || !roles.includes("admin"))
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  return false;
};

exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  const isLoggedIn = user && user.app_metadata;
  const roles = user.app_metadata.roles || [];

  let result = test401Error(isLoggedIn, roles) || addMovieQuery(event);
  return result;
};
