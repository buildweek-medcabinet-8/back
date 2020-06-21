const cryptZ = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "user1",
      password: cryptZ.hashSync("password", 12),
      email: "anyemail1@email.com",
    },
    {
      username: "user2",
      password: cryptZ.hashSync("password", 12),
      email: "anyemail2@email.com",
    },
    {
      username: "user3",
      password: cryptZ.hashSync("password", 12),
      email: "anyemail3@email.com",
    },
    {
      username: "user4",
      password: cryptZ.hashSync("password", 12),
      email: "anyemail4@email.com",
    },
  ]);
};
