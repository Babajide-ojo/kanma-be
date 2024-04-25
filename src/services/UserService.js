// services/userService.js
const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const { generateUniqueToken } = require("../utils/helper");

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
        const token = generateUniqueToken();
        return token;
    } catch (error) {
        throw new Error('Error generating reset token');
    }
}

async saveResetToken(email, token) {
    try {
        // Find user by email and update or create a reset token
        const user = await this.getUserByEmail(email);
        console.log({user});
        let payload = {
          user: user._id,
          token
        }

        console.log({payload});
       
        if (user) {
          const user = await ResetToken.create(payload);
        }
    } catch (error) {
        throw new Error('Error saving reset token');
    }
}

async getResetTokenByEmail(email){
  try {
    const token = ResetToken.findOne({email});
    return token;
} catch (error) {
    throw new Error('Error generating reset token');
}
}

  // Add more methods as needed
}

module.exports = new UserService();
