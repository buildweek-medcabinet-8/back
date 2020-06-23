const router = require("express").Router();
const Users = require("./users-model");
const recommendationsRouter = require("./recommendations-router");

router.use("/recs", recommendationsRouter);

router.get("/", (req, res) => {
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}`,
  });
});

router.delete("/del-user", (req, res) => {
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

router.get("/preferences", async (req, res) => {
  let user = req.decodedJwt.username;
  let id = req.decodedJwt.subject;
  let flavors = await Users.getPrefs(id, "user_flavors");
  let effects = await Users.getPrefs(id, "user_effects");

  res.status(200).json({
    message: `arr ${user}, here be your prefs`,
    flavors: flavors,
    effects: effects,
  });
});

module.exports = router;
