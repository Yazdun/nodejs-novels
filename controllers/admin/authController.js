const { User } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("email and password are required");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new UnauthenticatedError("email or password is not correct");

  if (!user.isAdmin)
    throw new UnauthenticatedError("email or password is not correct");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("email or password is not correct");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = {
  loginAdmin,
};
