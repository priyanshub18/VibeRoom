import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.auth.userId;
    // console.log("Current User: ", currentUser);
    const users = await User.find({ clerkId: { $ne: currentUser } });
    // console.log("All other users : ", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error on getting all users: ", error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const message = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    }).sort({ createdAt: 1 });
    console.log("Messages: ", message);

    res.status(200).json({
      messages: message,
    });
  } catch (error) {
    console.error("Error on getting messages: ", error);
    next(error);
  }
};
