const profile = async (req, res) => {
  res.json({
    message: 'profile page',
    username: res.locals.user.userName   // requires auth middleware set in server.js
  });
};

module.exports = profile;
