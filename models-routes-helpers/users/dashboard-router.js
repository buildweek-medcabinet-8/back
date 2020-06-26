const router = require("express").Router();
const Users = require("./users-model");
const Account = require("./account-model");
const listsRouter = require("../lists/lists-router");
const axios = require("axios");
const FormData = require("form-data");
router.use("/list", listsRouter);

router.get("/", (req, res) => {
  let user = req.decodedJwt.username;

  res.status(200).json({
    message: `welcome to your secret page, ${user}. :)`,
  });
});

router.get("/lists", async (req, res) => {
  try {
    let id = req.decodedJwt.subject;
    let user = req.decodedJwt.username;

    let listName = req.body.listName;
    console.log("is the id wrong?", id);

    let effects = await Users.getLists(id, "effects");
    let flavors = await Users.getLists(id, "flavors");
    let descriptions = await Users.getLists(id, "list_descriptions");
    let resObj = {};
    console.log("start effects ", effects, " end effects");
    console.log("start flavors ", flavors, " end flavors");
    effects.forEach((effect) => {
      if (!resObj[effect.listName]) {
        resObj[effect.listName] = {
          effects: [],
        };
      }
      resObj = {
        ...resObj,
        [effect.listName]: {
          ...resObj[effect.listName],
          effects: [...resObj[effect.listName].effects, effect.effect],
        },
      };
    });

    flavors.forEach((flavor) => {
      if (resObj[flavor.listName].flavors === undefined) {
        resObj[flavor.listName] = {
          effects: [...resObj[flavor.listName].effects],
          flavors: [],
        };
      }

      resObj = {
        ...resObj,
        [flavor.listName]: {
          ...resObj[flavor.listName],
          flavors: [...resObj[flavor.listName].flavors, flavor.flavor],
        },
      };
    });

    descriptions.forEach((description) => {
      if (resObj[description.listName].descriptions === undefined) {
        resObj[description.listName] = {
          effects: [...resObj[description.listName].effects],
          flavors: resObj[description.listName].flavors,

          description: [],
        };
      }
      console.log(description, " this shouldn't be undefined");
      resObj = {
        ...resObj,
        [description.listName]: {
          ...resObj[description.listName],
          description: [
            ...resObj[description.listName].description,
            description.userDescription,
          ],
        },
      };
    });

    res.status(200).json({
      message: `better data shapes, happier users. Wouldn't you say, ${user}? :)`,
      resObj: resObj,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.get("/recommendations", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let prefs = req.body.prefs;

    const formData = new FormData();
    //  const effects = await
    //  const flavors = await

    formData.append("Flavors/Effects", prefs);

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
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.post("/add-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let listName = req.body.listName;
    let id = req.decodedJwt.subject;
    //include listName in req.body please ADD THIS TO THE README
    let newPreferences = req.body;
    // let listIDObj = await Users.getListId(listName, id);
    // let listId = listIDObj[0].id;

    let exists = await Users.getListId(listName, id);
    //  console.log(exists, exists, exists, exists, exists);
    if (exists.length > 1) {
      res.status(400).json({
        message: "bruh. a list with that name already exists.",
        error: "That's a bummer for ya",
      });
    }
    console.log();
    let newListId = await Users.addList(listName, id);
    let allFlavors = await Users.getEffectOrFlavorIds("flavor");
    let allEffects = await Users.getEffectOrFlavorIds("effect");
    newListId = newListId;
    console.log("LIST ID LIST ID LIST ID AAAAAAAAAAAA ", newListId, newListId);
    let payload = {
      flavors: [],
      effects: [],
      listName: newPreferences.listName,
      descriptionObj: {
        description: newPreferences.description,
        list_ID: newListId,
      },
    };

    const someFlavors = allFlavors.filter((flavor) => {
      return newPreferences.flavors.some(function (e) {
        return e == flavor.flavor;
      });
    });

    const someEffects = allEffects.filter((effect) => {
      return newPreferences.effects.some(function (e) {
        return e == effect.effect;
      });
    });

    someFlavors.map((flavor) => {
      payload.flavors.push({ list_id: newListId, flavor_id: flavor.id });
    });
    someEffects.map((effect) => {
      payload.effects.push({ list_id: newListId, effect_id: effect.id });
    });

    console.log(payload.flavors);
    console.log(payload.effects);

    await Users.updatePrefs(payload.flavors, "flavor");
    await Users.updatePrefs(payload.effects, "effect");
    if (payload.descriptionObj.description) {
      await Users.updatePrefs(payload.descriptionObj, "description");
    }

    res.status(200).json({
      message: `you just CREATED list: ${listName}, ${user} `,
      effects: newPreferences.effects,
      flavors: newPreferences.flavors,
      description: newPreferences.description,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.put("/update-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let listName = req.body.listName;
    let id = req.decodedJwt.subject;
    //include listName in req.body please ADD THIS TO THE README
    let newPreferences = req.body;
    // let listIDObj = await Users.getListId(listName, id);
    // let listId = listIDObj[0].id;
    await Users.deleteList(listName, id);
    let newListId = await Users.addList(listName, id);
    let allFlavors = await Users.getEffectOrFlavorIds("flavor");
    let allEffects = await Users.getEffectOrFlavorIds("effect");
    newListId = newListId[0];
    console.log("LIST ID LIST ID LIST ID AAAAAAAAAAAA ", newListId, newListId);
    let payload = {
      flavors: [],
      effects: [],
      listName: newPreferences.listName,
      descriptionObj: {
        description: newPreferences.description,
        list_ID: newListId,
      },
    };

    const someFlavors = allFlavors.filter((flavor) => {
      return newPreferences.flavors.some(function (e) {
        return e == flavor.flavor;
      });
    });

    const someEffects = allEffects.filter((effect) => {
      return newPreferences.effects.some(function (e) {
        return e == effect.effect;
      });
    });

    someFlavors.map((flavor) => {
      payload.flavors.push({ list_id: newListId, flavor_id: flavor.id });
    });
    someEffects.map((effect) => {
      payload.effects.push({ list_id: newListId, effect_id: effect.id });
    });

    console.log(payload.flavors);
    console.log(payload.effects);

    await Users.updatePrefs(payload.flavors, "flavor");
    await Users.updatePrefs(payload.effects, "effect");
    if (payload.descriptionObj.description) {
      await Users.updatePrefs(payload.descriptionObj, "description");
    }

    res.status(200).json({
      message: `you updated your preferences for list: ${listName}, ${user} `,
      effects: newPreferences.effects,
      flavors: newPreferences.flavors,
      description: newPreferences.description,

      sideNote: `preferences updated for list ${newPreferences.listName}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.delete("/delete-list", async (req, res) => {
  try {
    let listName = req.body.listName;
    let id = req.decodedJwt.subject;

    await Users.deleteList(listName, id);

    res.status(200).json({
      message: `You just deleted list: ${listName}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
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
      res.status(500).json({
        message: "Something went wrong",
        err: err,
        errmessage: err.message,
      });
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
