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
      tbl.increments();
    })
    .createTable("user_effects", (tbl) => {
      tbl.increments();
    });
};
//SELECT EFFECTID FROM USER_EFFECTS WHERE USERID = ID
exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("user_effects")
    .dropTableIfExists("user_flavors")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
