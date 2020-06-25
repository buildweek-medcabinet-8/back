const router = require("express").Router();
const Users = require("./users-model");
const Account = require("./account-model");
const listsRouter = require("../lists/lists-router");
const axios = require("axios");
const FormData = require("form-data");
router.use("/lists", listsRouter);

router.get("/", (req, res) => {
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}`,
  });
});

router.get("/recommendations", async (req, res) => {
  let user = req.decodedJwt.username;

  const formData = new FormData();
  //  const effects = await
  //  const flavors = await

  formData.append("Flavors/Effects", "I love choosing weeds");

  const recResponse = await axios.post(
    "https://medcabinet-v2.herokuapp.com/recommend",
    formData,
    {
      // You need to use `getHeaders()` in Node.js because Axios doesn't
      // automatically set the multipart form boundary in Node.
      headers: formData.getHeaders(),
    }
  );
  const recommendations = recResponse.data;

  console.log(recommendations);
  res
    .status(200)
    .json({ recommendations: recommendations, message: "Your strains" });
});

router.put("/update-preferences", async (req, res) => {
  let user = req.decodedJwt.username;
  let userObj = await Users.findBy({ key: "username", content: user });

  let newPreferences = req.body;
  let payload = {
    flavors: [],
    effects: [],
    listName: newPreferences.listName,
    descriptionObj: {
      description: newPreferences.description,
      userid: userObj.id,
    },
  };

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
  someEffects.map((effect) => {
    payload.effects.push({ user_id: userObj.id, effect_id: effect.id });
  });

  await Users.updatePrefs(payload.flavors, "flavor");
  await Users.updatePrefs(payload.effects, "effect");
  if (payload.descriptionObj.description) {
    await Users.updatePrefs(payload.descriptionObj, "description");
  }

  res.status(200).json({
    message: "You updated your preferences, " + userObj.username,
    payload: newPreferences,
    sideNote: `preferences updated for list ${newPreferences.listName}`,
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
  try {
    let user = req.decodedJwt.username;
    let id = req.decodedJwt.subject;
    let listName = req.body.listName;

    let listIDObj = await Users.getListId(listName, id);
    let listId = listIDObj[0].id;

    let flavors = await Users.getPrefs(listId, "list_flavors");
    let effects = await Users.getPrefs(listId, "list_effects");
    let descriptionRes = await Users.getPrefs(listId, "list_descriptions");

    description = {
      userDescription: "no description provided",
      ...descriptionRes,
    };

    //the helper is designed to take an ID and not a name but there's an if condition in the helper for now. emergency temporary fix
    res.status(200).json({
      message: `arr ${user}, here be your prefs for list ${listName}`,
      flavors: flavors,
      effects: effects,
      description: description.userDescription,
      listId: listId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "bropken times", err: err, errmessage: err.message });
  }
});

module.exports = router;
