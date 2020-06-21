const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");
const cryptZ = require("bcryptjs");

const secrets = require("../secrets/secret");

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

router.route("/register").post((req, res) => {
  let user = req.body;
  const hash = cryptZ.hashSync(user.password, 12);
  user.password = hash;
  console.log(`user is ${user.username}`);
  Users.addUser(user)
    .then((userRegRes) => {
      res
        .status(201)
        .json({
          message: "You successfully registered! (response being updated)",
        });

      // Users.findBy({ content: userRegRes[0], key: "id" })
      //   .then((usr) => {
      //     const token = generateToken(usr);

      //     res.status(201).json({
      //       message: "Registration successful",
      //       user: {
      //         id: usr.id,
      //         email: usr.email,
      //         username: usr.username,
      //       },
      //       authorization: token,
      //     });
      //   })
      //   .catch((err) => {
      //     res.status(500).json({
      //       message:
      //         "something went wrong looking for the entry after creation.",
      //       err: err.message,
      //     });
      //   });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "not sure what happened boss", err: err.message });
    });
});

router.route("/login").post((req, res) => {
  let { username, password } = req.body;
  Users.findBy({ content: username, key: "username" })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "Either that user doesn't exist, or the table goofed up",
        });
      }

      if (user && cryptZ.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `welcome, ${username}`,

          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          token,
        });
      } else {
        res.status(401).json({
          message: "username or password incorrect",
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          passwordSupplied: password,
          passwordsMatch: cryptZ.compareSync(password, user.password),
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, err: err, idk: "IDK" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, //sub
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
