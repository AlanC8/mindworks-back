import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import AuthController from "./auth-controller";
import AuthService from "./auth-service";
import User from "./models/User";
const authRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/users", authController.getAllUsers);
export interface UserRequest {
  id: string;
  email: string;
  username: string;
  password: string;
}

interface AugmentedRequest {
  id: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  age: number;
  education: string;
  work: string;
}

authRouter.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = req.user as UserRequest;
    res.json(user);
  } catch (error) {
    console.error("Error in /auth/me route:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

authRouter.put("/auth/update", authMiddleware, async (req, res) => {
  try {
    const userId = (req.user as AugmentedRequest).id;
    const updates = req.body;
    const allowedUpdates = [
      "username",
      "email",
      "age",
      "gender",
      "education",
      "work",
    ];
    const fieldsToUpdate = Object.keys(updates).filter((key) =>
      allowedUpdates.includes(key)
    );
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    fieldsToUpdate.forEach((field) => {
      user[field] = updates[field];
    });
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error in /auth/update route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You have access to this route!" });
});

export default authRouter;
