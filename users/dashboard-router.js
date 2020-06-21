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
  //IDK DUDE MAYBE CALL THE DS API OR SOMETHING AY?
  // Users.findBy()
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
  //       message: "something went wrong looking for the entry after creation.",
  //       err: err.message,
  //     });
  //   });

  let returnedObj = {
    yourName: `${user}, do a thing!`,
    Strain: "weed",
    type: "teh green weed",
    rating: "like 52 stars dude",
    effect: ["Creative", "Energetic", "Tingly", "Focused"],
    flavor: ["Minty", "Chemical", "Cheese"],
    description: "I mean this weed is basically the weediest and the cheesiest",
  };
  //So here's the question of the day. If we're not allowed to write additional tables, how do we expect
  //to store a user's weed preferences?
  res.status(200).json({ content: returnedObj, message: "Your strains" });
});

router.post("/update-preferences", (req, res) => {
  /////////const [directive, token] = req.headers.authorization.split(" ");
  ///////////////let user = req.decodedJwt.username;
  let user = "user2";
  //let newPreferences = req.body.somethin
  let newPreferences = {
    flavors: ["Earthy", "Sweet", "Citrus", "Flowery", "Violet", "Diesel"],
    effects: ["Creative", "Energetic", "Tingly", "Euphoric"],
  };

  let payload = Users.getEffectOrFlavorIds("flavor")
    .then((allFlavors) => {
      const someFlavors = allFlavors.filter((flavor) => {
        console.log(flavor.flavor);
        console.log(newPreferences.flavors);
        return newPreferences.flavors.some(function (e) {
          return e == flavor.flavor;
        });
      });

      res.status(201).json({
        message: "testing flavor id getter",
        response: someFlavors,
      });
      // newPreferences.flavors.forEach((flavor) => {});
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error time", err: err, errmessage: err.message });
    });
  Users.updatePrefs(newPreferences, user, "flavor")
    .then((response) => {
      res.status(201).json({
        message: "uhhh well here we are, ya did it, updations....",
        response: response,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error time", err: err, errmessage: err.message });
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
