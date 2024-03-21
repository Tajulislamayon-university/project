const { userModel } = require("../model");
const bcrypt = require("bcryptjs");
const { getJwtAccessToken, getJwtRefreshToken } = require("./token.service");
const ApiError = require("../config/error");
const { StatusCodes } = require("http-status-codes");

/**
 * *Login a new User
 * @param {object} payload => {email:String, password:String}
 */
const login = async (payload) => {
  const userExists = await userModel.findOne({
    $or: [{ email: payload.userName }, { userName: payload.userName }],
  });

  if (!userExists) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No User Register with this email id exists"
    );
  }

  if (!comparePassword(payload.password, userExists.password)) {
    throw new ApiError(400, "Invalid Credentials!!");
  }

  const accessToken = getJwtAccessToken({
    id: userExists._id,
    email: userExists.email,
  });

  const refreshToken = getJwtRefreshToken({
    id: userExists._id,
    email: userExists.email,
  });

  return {
    accessToken,
    refreshToken,
    role: userExists.role,
    userName: userExists.userName,
    email: userExists.email,
  };
};

/**
 * *Create a New User
 * @param {Object} payload = >{firstName:String, lastName:String, email:String, password:String }
 * @returns {Object} New User
 */
const register = async (payload) => {
  // *Check if the user Already exits
  const userExists = await userModel.findOne({ email: payload.email });

  if (userExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User Already Exists!!");
  }

  payload["password"] = getHashedPassword(payload.password); // *Generate Hashed Password

  const newUser = new userModel(payload); // *Add new User

  return await newUser.save();
};

/**
 * * Returns Encrypted Password
 * @param {String} password
 */
const getHashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
  return bcrypt.hashSync(password, salt);
};

/**
 * * Compare the encrypted password and the normal string password
 * @param {String} password
 * @param {String} hashedPassword
 * @returns Boolean
 */
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371e3; // Earth radius in meters
  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δφ = degreesToRadians(lat2 - lat1);
  const Δλ = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

function withinRadius(lat1, lon1, lat2, lon2, radius) {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return distance <= radius;
}

module.exports = {
  login,
  register,
  getHashedPassword,
};
