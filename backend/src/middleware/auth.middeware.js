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
    const user = await clerkClient.users.getUserById(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === user.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden" }, { admin: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
