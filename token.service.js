const jwt = require("jsonwebtoken");

function getJwtAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SCERET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
}
const getJwtRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SCERET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_TIME,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SCERET_KEY);
};

module.exports = {
  getJwtAccessToken,
  getJwtRefreshToken,
  verifyToken,
};
