const db = require("../../database/dbConfig");

module.exports = {
  saveTraits,
  getLists,
  getIds,
  //helpers go here
};
function getLists(id) {
  id ? null : (id = 0);
  return db("lists").where({ user_id: id });
}

function getIds(userid) {
  return db("user_flavors as uf")
    .join("user_effects as ue", "ue.user_id", "uf.user_id")
    .join("lists as l", "l.user_id", userid)
    .where("ue.user_id", userid)
    .andWhere("uf.user_id", userid);
}

async function saveTraits(traitsObj) {
  let listName = traitsObj.listName;
  let effectsArr = traitsObj.effects;
  let flavorsArr = traitsObj.flavors;
  let objArr = [];

  for (let i = 0; i < flavorsArr.length - 1; i++) {
    objarr[i]["flavor_id"] = flavorsArr[i];
  }
  for (let i = 0; i < effectsArr.length - 1; i++) {
    objarr[i]["effect_id"] = effectsArr[i];
  }
  objArr.map((effect) => {
    console.log(`currently looking at  ${effect["effect_id"]}`);
  });
  //   await db("preference_lists as pl")
  //     .leftJoin("lists as l", "pl.list_id", "l.list_id")
  //     .where({ list_id: traitsObj.list_id })
  //     .del();

  //   return db("preference_lists as pl")
  //     .leftJoin("lists as l", "pl.list_id", "l.list_id")
  //     .where({ list_id: traitsObj.list_id })
  //     .insert({ list_id: traitsObj.list_id });
}
