exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("savedRecommendations")
    .dropTableIfExists("list_descriptions")
    .dropTableIfExists("list_flavors")
    .dropTableIfExists("list_effects")
    .dropTableIfExists("lists")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("savedRecommendations")
    .dropTableIfExists("list_descriptions")
    .dropTableIfExists("list_flavors")
    .dropTableIfExists("list_effects")
    .dropTableIfExists("lists")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
