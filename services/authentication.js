const JWT = require('jsonwebtoken');
const secret = '$superman213';

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};
