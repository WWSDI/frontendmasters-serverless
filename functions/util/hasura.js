const fetch = require("node-fetch");

async function query({ query, variabes = {} }) {
  const result = await fetch(process.env.HASURA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variabes }),
  }).then((res) => res.json());

  // TODO: show helpful info if there's an error

  return result.data;
}

exports.query = query;
