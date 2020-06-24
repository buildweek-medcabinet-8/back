const db = require("../../database/dbConfig");

module.exports = {
  getEffects,
  getFlavors,
};
//helpers go here
function getEffects() {
  return db("effects");
}
function getFlavors() {
  return db("flavors");
}
