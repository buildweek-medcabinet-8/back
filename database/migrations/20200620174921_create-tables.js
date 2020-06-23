exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("user_effects")
    .dropTableIfExists("user_flavors")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("user_effects")
    .dropTableIfExists("user_flavors")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
