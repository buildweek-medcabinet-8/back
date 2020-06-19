const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
  remove,
};
//helpers go here
function getUsers() {
  return db("users").select("id", "username").orderBy("id");
}

function getUserById(id) {
  return db("users").select("id", "username").where({ id });
}
function addUser(user) {
  console.log(`now we're inserting ${user.username}`);

  return db("users").insert(user);
}

function findBy(filter) {
  return db("users as u")
    .where({ [filter.key]: filter.content })
    .first();
}

function remove(username) {
  console.log("server attempting to delete, ", username);
  return db("users");
}
