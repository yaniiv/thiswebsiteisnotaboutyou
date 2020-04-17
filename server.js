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

const {
  addContribution,
  queryForAllContributions,
} = require("./api/controller");

const LOGGER_FORMAT = dev
  ? "dev"
  : ":method :url :status :res[content-length] - :response-time ms";

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(morgan(LOGGER_FORMAT));
  server.use(geolocationParser);

  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  // const { pathname, query } = parsedUrl

  server.get("/contributions", async (req, res) => {
    console.warn("server.get contributions");
    let contributions;
    try {
      contributions = await queryForAllContributions();
      console.warn("contributions", contributions);
    } catch (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json(contributions);
  });

  server.post("/contributions", async (req, res) => {
    console.warn("server.post contributions,", req.body);
    let contributionAddedConfirmation;
    try {
      contributionAddedConfirmation = await addContribution(req.body);
    } catch (err) {
      const errorCode = parseInt(err.message);
      return res.status(errorCode).json(err.message);
    }
    res.status(200).send(contributionAddedConfirmation);
  });

  server.get("*", (req, res) => {
    console.warn("req.ip", req.ip);
    console.warn("req.cookies", req.cookies);
    console.warn("req.query", req.query);
    console.warn("req.parsedIp", req.parsedIp);

    return handle(req, res);
  });

  server.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;
    if (!process.env.PORT) {
      console.log("NO process.env.PORT found");
    }
    console.log("> HOLLA on http://localhost: port:", process.env.PORT || 5000);
  });
});
