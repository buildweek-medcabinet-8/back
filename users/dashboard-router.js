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
    yourName: `${token}, do a thing!`,
    Strain: "weed",
    type: "teh green weed",
    rating: "like 52 stars dude",
    effect: ["Creative", "Energetic", "Tingly", "Focused"],
    flavor: ["Minty", "Chemical", "Cheese"],
    description: "I mean this weed is basically the weediest and the cheesiest",
  };

  res.status(200).json({ content: returnedObj, message: "Your strains" });
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
