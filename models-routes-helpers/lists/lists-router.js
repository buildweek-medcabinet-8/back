// const router = require("express").Router();
// //const jwt = require("jsonwebtoken");
// const Users = require("../users/users-model");
// const Lists = require("../lists/lists-model");
// //const cryptZ = require("bcryptjs");

// //const secrets = require("../../secrets/secret");

// router.route("/save").post(async (req, res) => {
//   let id = req.decodedJwt.subject;
//   //effects and flavors need to be arrays of their respective IDs
//   console.log("GOGOGOGOGOGOGOGOGOG ", req);

//   Lists.getIds(id)
//     .then((preferenceIds) => {
//       res.status(201).json({
//         message: "enjoy",
//         lists: preferenceIds,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "iuhhhh it borked",
//         err: err,
//         errmessage: err.message,
//       });
//     });

//   //   Lists.saveTraits(id)
//   //     .then((userLists) => {
//   //       res.status(201).json({
//   //         message: "if you got an empty array, check that you're passing the ID",
//   //         lists: userLists,
//   //       });
//   //     })
//   //     .catch((err) => {
//   //       res.status(500).json({
//   //         message: "iuhhhh it borked",
//   //         err: err,
//   //         errmessage: err.message,
//   //       });
//   //     });
// });

// module.exports = router;
