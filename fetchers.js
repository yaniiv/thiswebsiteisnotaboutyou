import fetch from "isomorphic-unfetch";

/*
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
*/

// Default options are marked with *
export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// Example POST method implementation:
export async function getData(url = "") {
  console.warn("url", url);
  // Default options are marked with *
  const response = await fetch(url);

  return response.json(); // parses JSON response into native JavaScript objects
}
