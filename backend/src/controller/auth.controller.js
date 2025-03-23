import User from "../models/user.model.js";
export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //check if user already exist in the database
    const user = await User.findOne({ clerkId: id });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      clerkId: id,
      fullName: `${firstName || ""} ${lastName || ""}`.trim(),
      imageUrl: imageUrl,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
