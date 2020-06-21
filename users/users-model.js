const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
  remove,
  updatePrefs,
  deletePrefs,
  getEffectOrFlavorIds,
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
//I used a dynamic key here so you can just find a user by any prop in the table
function findBy(filter) {
  console.log("searching for ", filter.content);

  return db("users as u")
    .where({ [filter.key]: filter.content })
    .first();
}

function remove(username) {
  console.log("server attempting to delete, ", username);
  return db("users");
}

function deletePrefs(user, type) {
  if (type === "effect") {
    return db("user_effects as ue")
      .join("users as u", "ue.user_id", "u.id")
      .del();
  } else if (type === "flavor") {
    return db("user_flavors as uf")
      .join("users as u", "uf.user_id", "u.id")
      .del();
  } else {
    return "you messed up. pass a 'type' argument as either 'effect' or 'flavor' please";
  }
}

function getEffectOrFlavorIds(type) {
  if (type === "effect") {
    return db("effects");
  }
  if (type === "flavor") {
    return db("flavors");
  }
}

async function updatePrefs(strObj, user, type) {
  if (type === "effect") {
    return db("user_effects as ue")
      .join("users as u", "ue.user_id", "u.id")
      .join("effects as e", "e.effect")
      .insert({ user_id: "" });
  } else if (type === "flavor") {
    return db("user_flavors as uf")
      .join("users as u", "uf.user_id", "u.id")
      .join("flavors as f")
      .insert({ user_id: 1, flavor_id: 33 });
  } else {
    return "you messed up. pass a 'type' argument as either 'effect' or 'flavor' please";
  }
}
