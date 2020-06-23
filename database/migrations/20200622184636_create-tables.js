exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("email", 256).notNullable().unique();
      tbl.string("password", 256).notNullable();
    })
    .createTable("flavors", (tbl) => {
      tbl.increments();
      tbl.string("flavor", 128).notNullable().unique();
    })
    .createTable("effects", (tbl) => {
      tbl.increments();
      tbl.string("effect", 128).notNullable().unique();
    })
    .createTable("user_flavors", (tbl) => {
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("cascade");
      tbl
        .integer("flavor_id")
        .notNullable()
        .unsigned()
        .references("flavors.id");
      tbl.primary(["user_id", "flavor_id"]); //forces the primary key so that there can't be id mismatches
    })
    .createTable("user_effects", (tbl) => {
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("cascade");
      tbl
        .integer("effect_id")
        .notNullable()
        .unsigned()
        .references("effects.id");
      tbl.primary(["user_id", "effect_id"]); //forces the primary key so that there can't be id mismatches
    })
    .createTable("savedRecommendations", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("cascade");
      tbl.string("strain", 128).notNullable();
    });
};
exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("user_effects")
    .dropTableIfExists("user_flavors")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
