const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  const [directive, token] = req.headers.authorization.split(" ");
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}`,
  });
});

router.get("/recommendations", async (req, res) => {
  const [directive, token] = req.headers.authorization.split(" ");
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

router.post("/update-preferences", async (req, res) => {
  /////////const [directive, token] = req.headers.authorization.split(" ");
  ///////////////let user = req.decodedJwt.username;

  let user = "user2";
  let newPreferences = req.body;
  // let newPreferences = {
  //   flavors: [
  //     "Tropical",
  //     "Strawberry",
  //     "Blueberry",
  //     "Mint",
  //     "Apple",
  //     "Honey",
  //     "Lavender",
  //     "Lime",
  //     "Coffee",
  //     "Ammonia",
  //     "Minty",
  //     "Tree",
  //     "Fruit",
  //     "Butter",
  //     "Pineapple",
  //   ],
  //   effects: [
  //     "Euphoric",
  //     "Relaxed",
  //     "Aroused",
  //     "Happy",
  //     "Uplifted",
  //     "Hungry",
  //     "Talkative",
  //     "None",
  //     "Giggly",
  //     "Focused",
  //     "Sleepy",
  //   ],
  // };

  let payload = { flavors: [], effects: [] };

  let userObj = await Users.findBy({ key: "username", content: user });

  await Users.deletePrefs(userObj.id, "effect");
  await Users.deletePrefs(userObj.id, "flavor");
  let allFlavors = await Users.getEffectOrFlavorIds("flavor");
  let allEffects = await Users.getEffectOrFlavorIds("effect");

  const someFlavors = allFlavors.filter((flavor) => {
    console.log(flavor.flavor);
    return newPreferences.flavors.some(function (e) {
      return e == flavor.flavor;
    });
  });

  const someEffects = allEffects.filter((effect) => {
    console.log(effect.effect);
    return newPreferences.effects.some(function (e) {
      return e == effect.effect;
    });
  });

  someFlavors.map((flavor) => {
    payload.flavors.push({ user_id: userObj.id, flavor_id: flavor.id });
  });
  someEffects.map((effect) => {
    payload.effects.push({ user_id: userObj.id, effect_id: effect.id });
  });

  let flavorUpdate = await Users.updatePrefs(payload.flavors, "flavor");
  let effectUpdate = await Users.updatePrefs(payload.effects, "effect");

  res.status(200).json({
    message:
      "fr you just updated the flavors and the effects, bravo. I might even send a response or something someday",
    sideNote:
      "just so you know, this update system is designed to delete your previous preferences. I hope you remember them",
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
// Users.deletePrefs(user, "effect")
//   .then((response) => {
//     res
//       .status(200)
//       .json({ message: "woohoo, you deleted everything", finish: response });
//   })
//   .catch((err) => {
//     res.status(500).json({
//       message: "Something went wrong",
//       err: err,
//       errmessage: err.message,
//     });
//   });
