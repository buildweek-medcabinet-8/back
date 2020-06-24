const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./models-and-helpers/auth/authenticate-middleware.js");
const authRouter = require("./models-and-helpers/auth/auth-router.js");
const dashboard = require("./models-and-helpers/users/dashboard-router.js");
const traitsRouter = require("./models-and-helpers/traits/traits-router");
const idPasser = require("./middleware/idPasser");

const server = express();

server.use(helmet());

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/profile", authenticate, dashboard);
server.use("/traits", traitsRouter);
module.exports = server;
