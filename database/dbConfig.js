const knex = require("knex");
const knexConfig = require("../knexfile");

const env = process.env.NODE_ENV || "development";
console.log("WHAT IS HAPPENING HUH ", env);
const configOptions = knexConfig[env];

module.exports = knex(configOptions);
