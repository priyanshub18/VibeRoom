import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    if (!req.auth?.userId) {
      console.log("Sending shit from here");
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (err) {
    next(err); // ✅ Pass error to error-handling middleware
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    console.log("Checking if the user is reaching here or not: requireAdmin");

    // Check if user is authenticated
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user details
    const user = await clerkClient.users.getUser(req.auth.userId);
    if (!user || !user.primaryEmailAddress) {
      return res.status(500).json({ message: "User data retrieval error" });
    }

    console.log("Checking user email:", user.primaryEmailAddress.emailAddress);

    // Check if user is an admin
    const isAdmin = process.env.ADMIN_EMAIL === user.primaryEmailAddress.emailAddress;
    console.log("Checking if the user is admin:", isAdmin);

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden", admin: false });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};