// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
// const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
const cookieParser = require("cookie-parser");

// Express middlewares
const morgan = require("morgan");
const geolocationParser = require("./geolocationParser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const LOGGER_FORMAT = dev
  ? "dev"
  : ":method :url :status :res[content-length] - :response-time ms";

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(morgan(LOGGER_FORMAT));
  server.use(geolocationParser);

  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  // const { pathname, query } = parsedUrl

  server.get("*", (req, res) => {
    console.warn("req.ip", req.ip);
    console.warn("req.cookies", req.cookies);
    console.warn("req.query", req.query);
    console.warn("req.parsedIp", req.parsedIp);

    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log("> HOLLA on http://localhost: port:", process.env.PORT || 3000);
  });
});
