const router = require("express").Router();
const Users = require("./users-model");

router.get("/", async (req, res) => {
  let user = req.decodedJwt.username;

  let returnedObj = {
    yourName: `${user}, do a thing!`,
    Strain: "weed",
    type: "teh green weed",
    rating: "like 52 stars dude",
    effect: ["Creative", "Energetic", "Tingly", "Focused"],
    flavor: ["Minty", "Chemical", "Cheese"],
    description: "I mean this weed is basically the weediest and the cheesiest",
  };

  res.status(200).json({ content: returnedObj, message: "Your strains" });
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
