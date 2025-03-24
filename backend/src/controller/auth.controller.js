import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ clerkId: id });

    if (user) {
      return res.status(200).json(user); // Changed from 409 to 200 with the user object
    }

    user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        // update or create with these fields
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl: imageUrl,
      },
      {
        upsert: true, // create if doesn't exist
        new: true, // return the updated/created document
        runValidators: true, // run model validators on update
      }
    );

    return res.status(201).json(user);
  } catch (error) {
    console.error("Auth Error:", error);

    // Check specifically for duplicate key error
    if (error.code === 11000) {
      // Return the existing user if it's a duplicate key error
      try {
        const existingUser = await User.findOne({ clerkId: id });
        if (existingUser) {
          return res.status(200).json(existingUser);
        }
      } catch (findError) {
        console.error("Error finding existing user:", findError);
      }
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
