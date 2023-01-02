const profile = async (req, res) => {
  res.json({
    message: 'profile page',
    username: res.locals.user.userEmail   // requires auth middleware set in server.js
  });
};

module.exports = profile;
