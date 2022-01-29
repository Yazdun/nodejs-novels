const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { validatePasswordStrength } = require("../../utils");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const updateUser = async (req, res) => {
  const { password } = req.body;

  if (password) {
    validatePasswordStrength(password);
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  if (!user)
    throw new BadRequestError(`User with id ${req.user.userId} doesn't exist`);

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

const getUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });
  if (!user) throw new UnauthenticatedError();

  const { password, email, _id, isAdmin, ...others } = user._doc;
  //   console.log(user);
  res.status(StatusCodes.OK).json({ user: others });
};

module.exports = {
  updateUser,
  getUser,
};
