const { verifyToken } = require('../services/authentication');

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      next();
    }
    try {
      const userPayload = verifyToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}
module.exports = {
  checkForAuthenticationCookie,
};
