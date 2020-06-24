const db = require("../../database/dbConfig");
const cryptZ = require("bcryptjs");

module.exports = {
  changePassword,
};
//helpers go here
function changePassword(id, password) {
  hashedPw = cryptZ.hashSync(password, 12);
  return db("users").where("id", id).update("password", hashedPw);
}
