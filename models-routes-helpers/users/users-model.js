const db = require("../../database/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
  remove,
  updatePrefs,
  deleteList,
  getPrefs,
  getEffectOrFlavorIds,
  getRecommendations,
  saveRecommendation,
  delRecommendation,
  getListId,
  addList,
  getLists,
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

function deleteList(listName, userId) {
  return db("lists").where({ listName: listName, user_id: userId }).del();
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
  console.log(payload);
  if (type === "effect") {
    return db("list_effects").insert(payload);
  } else if (type === "flavor") {
    return db("list_flavors").insert(payload);
  } else if (type === "description") {
    return db("list_descriptions").insert({
      userDescription: payload.description,
      list_id: payload.list_ID,
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

function addList(listName, user_id) {
  return db("lists").insert({ user_id, listName });
}

function getLists(user_id, type) {
  if (type === "effects") {
    return db("list_effects as le")
      .leftJoin("lists as l", "le.list_id", "l.id")
      .join("effects as e", "e.id", "le.effect_id")
      .where({ user_id: 1 })
      .select("l.listName", "e.effect");
  } else if (type === "flavors") {
    return db("list_flavors as lf")
      .leftJoin("lists as l", "lf.list_id", "l.id")
      .join("flavors as f", "f.id", "lf.flavor_id")
      .where({ user_id: 1 })
      .select("l.listName", "f.flavor");
  } else if (type === "list_descriptions") {
    return db("list_descriptions as ld")
      .leftJoin("lists as l", "ld.list_id", "l.id")
      .where({ user_id: 1 })
      .select("l.listName", "ld.userDescription");
  }
}
