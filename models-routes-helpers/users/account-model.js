const db = require("../../database/dbConfig");
const cryptZ = require("bcryptjs");

module.exports = {
  changePassword,
  deleteUser,
};
//helpers go here
function changePassword(id, password) {
  hashedPw = cryptZ.hashSync(password, 12);
  return db("users").where("id", id).update("password", hashedPw);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}
