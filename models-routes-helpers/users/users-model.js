const db = require("../../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
  remove,
  updatePrefs,
  deletePrefs,
  getPrefs,
  getEffectOrFlavorIds,
  getRecommendations,
  saveRecommendation,
  delRecommendation,
  getListId,
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

async function getPrefs(listId) {
  let effects = await db("user_effects as ue")
    .join("lists as l", "ue.user_id", "u.id")
    .where("ue.user_id", listId);
  let flavors = await db("user_effects as ue")
    .join("lists as l", "ue.user_id", "u.id")
    .where("ue.user_id", listId);
  let = await db("user_effects as ue")
    .join("lists as l", "ue.user_id", "u.id")
    .where("ue.user_id", listId);
}

function deletePrefs(userID, type) {
  if (type === "effect") {
    return db("user_effects as ue")
      .join("users as u", "ue.user_id", "u.id")
      .where("ue.user_id", userID)
      .del();
  } else if (type === "flavor") {
    return db("user_flavors as uf")
      .join("users as u", "uf.user_id", "u.id")
      .where("uf.user_id", userID)
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

function getRecommendations(id) {
  return db("savedRecommendations as sr")
    .where("sr.user_id", id)
    .select("sr.strain");
}

function saveRecommendation(strain, id) {
  return db("savedRecommendations").insert({ user_id: id, strain: strain });
}
function delRecommendation(strain, id) {
  return db("savedRecommendations")
    .where({ user_id: id, strain: strain })
    .del();
}

function updatePrefs(payload, type) {
  if (type === "effect") {
    return db("list_effects").insert(payload);
  } else if (type === "flavor") {
    return db("list_flavors").insert(payload);
  } else if (type === "description") {
    return db("list_descriptions").insert({
      userDescription: payload.description,
      list_id,
    });
  } else {
    return "you messed up. pass a 'type' argument as either 'effect', description, or 'flavor' please";
  }
}

function getPrefs(listID, table) {
  if (table === "list_effects") {
    return db(table)
      .join("effects as e", "e.id", table + ".effect_id")
      .where({ list_id: listID })
      .select("effect");
  } else if (table === "list_flavors") {
    return db(table)
      .join("flavors as f", "f.id", table + ".flavor_id")
      .where({ list_id: listID })
      .select("flavor");
  } else if (table === "list_descriptions") {
    return db(table)
      .join("lists as l", "l.id", table + ".list_id")
      .where({ list_id: listID })
      .first();
  }
}

function getListId(listName, id) {
  return db("lists").where({ listName: listName, user_id: id });
}
