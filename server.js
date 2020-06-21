const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./auth/authenticate-middleware.js");
const authRouter = require("./auth/auth-router.js");
const dashboard = require("./users/dashboard-router.js");
const idPasser = require("./middleware/idPasser");

const server = express();

server.use(helmet());

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/profile", authenticate, dashboard);
module.exports = server;
