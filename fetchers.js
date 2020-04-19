import fetch from "isomorphic-unfetch";
import { isBrowser } from "./helpers";

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
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getData(url = "", clientIp, ego) {
  let requestUrl = `${url}?ip=${clientIp}`;

  if (ego) {
    requestUrl += `&ego=${ego}`;
  }

  console.warn("requestUrl", requestUrl);
  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
