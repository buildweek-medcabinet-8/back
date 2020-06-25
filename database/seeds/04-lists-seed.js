exports.seed = function (knex, Promise) {
  return knex("lists").insert([
    { user_id: 1, listName: "Sleepy" },
    { user_id: 1, listName: "Creative" },
    { user_id: 1, listName: "Couch" },
    { user_id: 2, listName: "Sleepy" },
    { user_id: 2, listName: "Creative" },
    { user_id: 2, listName: "Couch" },
  ]);
};
