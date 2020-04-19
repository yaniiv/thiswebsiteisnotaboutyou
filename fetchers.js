import fetch from "isomorphic-unfetch";

/* Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
*/

export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getData(url = "") {
  console.warn("url", url);
  const response = await fetch(url);

  return response.json();
}
