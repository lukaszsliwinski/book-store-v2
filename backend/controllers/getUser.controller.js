const getUser = async (req, res) => {
  res.json({
    user: res.locals.user   // requires auth middleware set in server.js
  });
};

module.exports = getUser;
