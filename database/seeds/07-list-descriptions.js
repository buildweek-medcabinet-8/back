exports.seed = function (knex, Promise) {
  return knex("list_descriptions").insert([
    { list_id: 1, userDescription: "don't" },
    { list_id: 2, userDescription: "stop" },
    { list_id: 3, userDescription: "me" },
    { list_id: 4, userDescription: "now" },
    { list_id: 5, userDescription: "cause" },
    { list_id: 6, userDescription: "I'm" },
  ]);
};
