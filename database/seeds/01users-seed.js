const cryptZ = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user1", password: cryptZ.hashSync("password", 12) },
        { username: "user2", password: cryptZ.hashSync("password", 12) },
        { username: "user3", password: cryptZ.hashSync("password", 12) },
        { username: "user4", password: cryptZ.hashSync("password", 12) },
      ]);
    });
};
