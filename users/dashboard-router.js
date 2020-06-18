const restricted = require("../auth/authenticate-middleware");
const axios = require("axios");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to your secret page",
  });
});

module.exports = router;
