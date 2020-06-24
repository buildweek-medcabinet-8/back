const Traits = require("./traits-model");
const router = require("express").Router();

router.get("/effects", (req, res) => {
  Traits.getEffects()
    .then((effects) => {
      res.status(200).json({
        message: `here are the effects`,
        effects: effects,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "bropken times", err: err, errmessage: err.message });
    });
});
router.get("/flavors", (req, res) => {
  Traits.getFlavors()
    .then((effects) => {
      res.status(200).json({
        message: `here are the flavors`,
        effects: effects,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "bropken times", err: err, errmessage: err.message });
    });
});

module.exports = router;
