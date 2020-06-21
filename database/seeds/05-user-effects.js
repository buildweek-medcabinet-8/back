exports.seed = function (knex, Promise) {
  return knex("user_effects").insert([
    { user_id: 1, effect_id: 1 },
    { user_id: 1, effect_id: 2 },
    { user_id: 1, effect_id: 3 },
    { user_id: 1, effect_id: 4 },
    { user_id: 1, effect_id: 5 },
    { user_id: 1, effect_id: 8 },
    { user_id: 2, effect_id: 3 },
    { user_id: 2, effect_id: 5 },
    { user_id: 2, effect_id: 6 },
    { user_id: 2, effect_id: 7 },
    { user_id: 2, effect_id: 8 },
    { user_id: 2, effect_id: 9 },
    { user_id: 2, effect_id: 10 },
    { user_id: 2, effect_id: 11 },
  ]);
};
