// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
// const { createServer } = require("http");
require("dotenv").config();

const next = require("next");
const express = require("express");
const cookieParser = require("cookie-parser");

// Express middlewares
const morgan = require("morgan");
const geolocationParser = require("./geolocationParser");

// Routes Handlers
const { addContribution, getAllContributions } = require("./controller");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

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

  server.get("/contributions", async (req, res) => {
    console.warn("server.get");
    console.warn("req.query.ip", req.query.ip);
    console.warn("req.query.ego", req.query.ego);
    let parsedIp = req.query.ip;

    // bypass filtering by IP by setting filter value to {}
    if (req.query.ego) {
      parsedIp = undefined;
    }

    let contributions;

    try {
      contributions = await getAllContributions(parsedIp);
      console.warn("contributions.length", contributions.length);
    } catch (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json(contributions);
  });

  server.post("/contributions", async (req, res) => {
    console.warn("server.post");

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
    // console.warn("req.ip", req.ip);
    // console.warn("req.cookies", req.cookies);
    // console.warn("req.query", req.query);
    // console.warn("req.parsedIp", req.parsedIp);
    // console.warn("req.clientIp", req.clientIp);

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
