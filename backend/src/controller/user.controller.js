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

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    console.log("Messages: ", messages);

    res.status(200).json({
      messages: messages,
    });
  } catch (error) {
    console.error("Error on getting messages: ", error);
    next(error);
  }
};
