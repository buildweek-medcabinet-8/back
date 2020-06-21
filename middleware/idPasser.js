module.exports = (req, res, next) => {
  const { id } = req.params;
  req.userId = id;

  console.log(req.userId);
  next();
};
