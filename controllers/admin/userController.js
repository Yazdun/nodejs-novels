const { User } = require("../../models");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const users = await User.find({}, [
    "image",
    "username",
    "email",
    "createdAt",
  ]).sort("createdAt");

  res.status(StatusCodes.OK).json({ users });
};

const getUsersStats = async (req, res) => {
  const users = await User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ users });
};

module.exports = { getAllUsers, getUsersStats };
