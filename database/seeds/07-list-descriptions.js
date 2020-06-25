exports.seed = function (knex, Promise) {
  return knex("list_descriptions").insert([
    { list_id: 1, userDescription: "don't" },
    { list_id: 1, userDescription: "stop" },
    { list_id: 1, userDescription: "me" },
    { list_id: 1, userDescription: "now" },
    { list_id: 1, userDescription: "cause" },
    { list_id: 1, userDescription: "I'm" },
    { list_id: 2, userDescription: "Havin1'" },
    { list_id: 2, userDescription: "a1" },
    { list_id: 2, userDescription: "good1" },
    { list_id: 2, userDescription: "times" },
    { list_id: 2, userDescription: "havin2" },
    { list_id: 2, userDescription: "a2" },
    { list_id: 2, userDescription: "good2" },
    { list_id: 2, userDescription: "time" },
  ]);
};
