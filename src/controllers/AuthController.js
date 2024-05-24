// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/UserService");
const { generateUnique } = require("../utils/helper");

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" });
            }

            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'kn;kscml;sc', { expiresIn: 3600000 });
            const userObject = user.toObject();

 
            delete userObject.password;
            delete userObject.createdAt;
            delete userObject.updatedAt;
    
            res.json({ user: userObject, token });
        } catch (error) {
            next(error);
        }
    }


    async requestPasswordReset(req, res, next) {
        try {
            const { email } = req.body;

            // Validate email
            if (!email) {
                return res.status(400).json({ message: "Please provide an email address" });
            }

            // Find user by email
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Generate reset token
            let resetToken = await userService.getResetTokenByEmail(email);
    
            // If reset token doesn't exist, generate a new one
            if (!resetToken) {
                resetToken =  generateUnique();
            } 

            // Save/reset token with user's email
            await userService.saveResetToken(email, resetToken);

            // Send reset email with the token
            //await sendResetEmail(email, resetToken.token);

            res.json({ message: "Password reset email sent successfully" });
        } catch (error) {
            next(error);
        }
    }

    async adminLogin(req, res, next) {
        try {
            const { email, password } = req.body;

         
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" });
            }

            // Find user by email
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'kn;kscml;sc', { expiresIn: 3600000 });
            const userObject = user.toObject();

 
            delete userObject.password;
            delete userObject.createdAt;
            delete userObject.updatedAt;
    
            res.json({ user: userObject, token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
