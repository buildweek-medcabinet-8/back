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
  let user = req.decodedJwt.username;
  //let user = "user2";

  let newPreferences = req.body;

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

  await Users.updatePrefs(payload.flavors, "flavor");
  await Users.updatePrefs(payload.effects, "effect");

  res.status(200).json({
    message: "You updated your preferences",
    payload: newPreferences,
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

router.get("/preferences", async (req, res) => {
  let user = req.decodedJwt.username;
  let userObj = await Users.findBy({ key: "username", content: user });
  let flavors = await Users.getPrefs(userObj.id, "user_flavors");
  let effects = await Users.getPrefs(userObj.id, "user_effects");

  res.status(200).json({
    message: `arr ${user}, here be your prefs`,
    flavors: flavors,
    effects: effects,
  });
});

module.exports = router;

//BIG THING FOR TOMORROW~!~~~~!!!! NEW ENDPOINT SHOULD BE "PREFERENCES" YEAH? KINDA SUCKS NOT TO BE ABLE TO SEE MY STUUUUFFFFFF
