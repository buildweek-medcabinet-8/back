const router = require("express").Router();
//const jwt = require("jsonwebtoken");
//const Users = require("../users/users-model");
//const cryptZ = require("bcryptjs");

//const secrets = require("../../secrets/secret");

router.route("/users").get((req, res) => {
  Users.getUsers()
    .then((allUsers) => {
      res.status(201).json({ message: "all users", users: allUsers });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "not sure what happened boss", err: err.message });
    });
});

module.exports = router;
