import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUser } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error on getting all users: ", error);
    next(error);
  }
};
