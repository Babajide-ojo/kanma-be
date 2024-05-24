// controllers/userController.js
const userService = require("../services/UserService");
const nodemailer = require("../config/nodemailer");

class UserController {
  async createUser(req, res, next) {
    try {
      // Check if email already exists
      const existingUser = await userService.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Validate request body
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }

      // Create user
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      console.log({ users });
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Please provide an email address" });
      }
      const message = await userService.saveResetToken(email);
      res.json({ message });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { newPassword, token } = req.body;
      if (!newPassword || !token) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
      await userService.updatePassword(newPassword, token);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
