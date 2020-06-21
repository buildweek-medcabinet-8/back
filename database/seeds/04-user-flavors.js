exports.seed = function (knex, Promise) {
  return knex("user_flavors").insert([
    { user_id: 1, flavor_id: 1 },
    { user_id: 1, flavor_id: 2 },
    { user_id: 1, flavor_id: 3 },
    { user_id: 1, flavor_id: 4 },
    { user_id: 1, flavor_id: 5 },
    { user_id: 1, flavor_id: 8 },
    { user_id: 2, flavor_id: 3 },
    { user_id: 2, flavor_id: 5 },
    { user_id: 2, flavor_id: 6 },
    { user_id: 2, flavor_id: 7 },
    { user_id: 2, flavor_id: 8 },
    { user_id: 2, flavor_id: 9 },
    { user_id: 2, flavor_id: 10 },
    { user_id: 2, flavor_id: 11 },
  ]);
};
