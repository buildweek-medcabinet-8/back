const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  const [directive, token] = req.headers.authorization.split(" ");
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}`,
  });
});

router.get("/delete-user", (req, res) => {
  const [directive, token] = req.headers.authorization.split(" ");
  let user = req.decodedJwt.username;
  Users.remove(user)
    .then((rmvdUsr) => {
      res.status(200).json({
        message: `YOU JUST DELETED, ${user}, be sure to delete the token from memory`,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

module.exports = router;
