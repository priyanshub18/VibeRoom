import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ clerkId: id });

    if (user) {
      console.log("If the user already exist in the databse i am checkging right now");
      return res.status(200).json(user); // Changed from 409 to 200 with the user object
    }
    console.log("Creating the new user under this: ", id, firstName, lastName);
    const user2 = await User.findOneAndUpdate(
      { clerkId: id }, // Find user by clerkId
      {
        $set: {
          clerkId: id, // Ensure clerkId is set on insert
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl: imageUrl,
        },
      },
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return updated document
        runValidators: true, // Run model validators
        setDefaultsOnInsert: true, // Apply default schema values
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
