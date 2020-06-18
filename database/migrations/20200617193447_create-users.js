exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("email", 256).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl
        .integer("role")
        .unsigned()
        .references("roles.id")
        .defaultTo(1)
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
