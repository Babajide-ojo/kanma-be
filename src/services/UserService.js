// services/userService.js
const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const bcrypt = require('bcrypt'); // Assuming bcrypt is used for hashing passwords
const { generateUniqueToken } = require("../utils/helper");
const nodemailer = require("../config/nodemailer")
class UserService {
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(_id) {
    try {
      const user = await User.findById({ _id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async generateResetToken() {
    try {
      const token = Math.floor(100000 + Math.random() * 900000);
      return token.toString(); // Ensure token is stored as string
    } catch (error) {
      throw new Error('Error generating reset token');
    }
  }
  
  async saveResetToken(email) {
    try {
      const user = await this.getUserByEmail(email);
  
      if (!user) {
        return "Email doesn't exist"
      }
  
      // Check if there's an existing reset token for the user
      let resetToken = await ResetToken.findOne({ user: user._id });
  
      if (!resetToken) {
        // If no reset token exists, generate a new one
        const tokenValue = await this.generateResetToken();
        const payload = {
          user: user._id,
          token: tokenValue
        };
        resetToken = await ResetToken.create(payload);
      }
  
      await nodemailer.forgotPasswordEmail(user.firstName, user.email, resetToken.token);
      
      return "Reset code sent!"; // Return the token
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  
  async getResetTokenByToken(token) { // Change function name and parameter
    try {
      const resetToken = await ResetToken.findOne({ token }); // Find by token, not email
      return resetToken;
    } catch (error) {
      throw new Error('Error retrieving reset token');
    }
  }
  
  async updatePassword(newPassword, token) {
    try {
      const resetToken = await this.getResetTokenByToken(token); // Use the correct function to retrieve token
  
      if (!resetToken) {
        throw new Error('Invalid or expired reset token');
      }
  
      const user = await this.getUserById(resetToken.user);
  
      console.log({user});
  
      if (!user) {
        throw new Error('User not found');
      }
  
      if (resetToken.user.toString() !== user._id.toString()) {
        throw new Error('Invalid token for this user');
      }
  
      //const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword;
      await user.save();
  
      await ResetToken.deleteOne({ token }); // Delete token after updating password
  
      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  }
  
}

module.exports = new UserService();
