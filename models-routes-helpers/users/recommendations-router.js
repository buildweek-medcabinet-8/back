const router = require("express").Router();
const Users = require("./users-model");

router.get("/", async (req, res) => {
  let user = req.decodedJwt.username;

  res
    .status(200)
    .json({ message: `you've made it to the recs, ${user}, magnificent.` });
});

router.get("/saved-recs", (req, res) => {
  let user = req.decodedJwt.username;
  let id = req.decodedJwt.subject;
  Users.getRecommendations(id)
    .then((recs) => {
      res.status(200).json({
        message: `Okay, ${user}, here are your saved recommendations`,
        recs: recs,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.post("/save-rec", (req, res) => {
  let user = req.decodedJwt.username;
  let id = req.decodedJwt.subject;
  let strain = req.body.strain;
  Users.saveRecommendation(strain, id)
    .then((rez) => {
      res.status(200).json({
        message: `Okay, ${user}, you just saved a ${strain} w33d.`,
        response: rez,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.delete("/del-rec", (req, res) => {
  let user = req.decodedJwt.username;
  let id = req.decodedJwt.subject;
  let strain = req.body.strain;

  Users.delRecommendation(strain, id)
    .then((recs) => {
      res.status(200).json({
        message: `Okay, ${user}, you just deleted ${strain} from your recommendations`,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

module.exports = router;
