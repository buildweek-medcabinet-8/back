const router = require("express").Router();
const Users = require("./users-model");
const Account = require("./account-model");

router.get("/", (req, res) => {
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}`,
  });
});

router.get("/recommendations", async (req, res) => {
  let user = req.decodedJwt.username;

  let returnedObj = [
    {
      yourName: `${user}, here's w33d 1!`,
      Strain: "weed",
      type: "teh green weed",
      rating: "5",
      effect: ["Creative", "Energetic", "Tingly", "Focused"],
      flavor: ["Minty", "Chemical", "Cheese"],
      description:
        "I mean this weed is basically the weediest and the cheesiest",
    },
    {
      yourName: `${user}, here's w33d 2!`,
      Strain: "POTATO",
      type: "sativa",
      rating: "4",
      effect: ["Creative", "Energetic", "Tingly", "Focused"],
      flavor: ["Minty", "Chemical", "Cheese"],
      description: "mashed potatoes. enjoy",
    },
    {
      yourName: `${user}, here's w33d 3!`,
      Strain: "Brain Freeze",
      type: "Hybrid",
      rating: "5",
      effect: ["Creative", "Energetic", "Tingly", "Focused"],
      flavor: ["Minty", "Chemical", "Cheese"],
      description: "I love bitconnect, yes",
    },
    {
      yourName: `${user}, here's w33d 4!`,
      Strain: "Empty Chef Boyardee Can",
      type: "???",
      rating: "1",
      effect: ["Creative", "Energetic", "Tingly", "Focused"],
      flavor: ["Minty", "Chemical", "Cheese"],
      description: "Kick it around, kick it all over town",
    },
    {
      yourName: `${user}, here's w33d 5!`,
      Strain: "Bay Leaf",
      type: "Actual Bay Leaf",
      rating: "1",
      effect: ["Creative", "Energetic", "Tingly", "Focused"],
      flavor: ["Minty", "Chemical", "Cheese"],
      description: "oops, someone dropped a bay leaf in your recommendations",
    },
  ];

  res.status(200).json({ content: returnedObj, message: "Your strains" });
});

router.put("/update-preferences", async (req, res) => {
  let user = req.decodedJwt.username;

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
    message: "You updated your preferences, " + userObj.username,
    payload: newPreferences,
    sideNote:
      "just so you know, this update system is designed to delete your previous preferences. I hope you remember them",
  });
});

router.delete("/delete-user", (req, res) => {
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

router.put("/change-password", (req, res) => {
  let id = req.decodedJwt.subject;
  let user = req.decodedJwt.username;
  let password = req.body.password;
  Account.changePassword(id, password)
    .then((pwres) => {
      res.status(200).json({
        message: `YOU JUST UPDATED YOUR PASSWORD, ${user}, GOOD JOB!`,
        pwres: pwres,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "bropken times", err: err, errmessage: err.message });
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
