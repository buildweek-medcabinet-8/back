const knex = require("knex");
const knexConfig = require("../knexfile");
//const env = "testing";
let env = process.env.NODE_ENV || "development";
if (env === "test") {
  env = "testing";
}
const configOptions = knexConfig[env];

module.exports = knex(configOptions);
