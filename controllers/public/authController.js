const { User } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const register = async (req, res) => {
  const emailExists = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  const usernameExists = await User.findOne({ username: req.body.username });

  if (emailExists && usernameExists)
    throw new BadRequestError(
      "this email is already registered,this username is already taken"
    );

  if (emailExists)
    throw new BadRequestError("this email is already registered");

  if (usernameExists)
    throw new BadRequestError("this username is already taken");

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("username and password are required");

  const user = await User.findOne({ username });
  if (!user)
    throw new UnauthenticatedError("username or password is not correct");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("username or password is not correct");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = {
  register,
  login,
};
