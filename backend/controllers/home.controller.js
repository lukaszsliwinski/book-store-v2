const home = (req, res) => {
  res.json({response: req.body.input})
};

module.exports = home;
