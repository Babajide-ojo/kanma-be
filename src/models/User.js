const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: true
  },
  profilePicture: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "active", "inactive"],
    default: "Active"
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
  }
});

UserSchema.set("timestamps", true);

// Hash the password before saving it to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  });
};


UserSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
});

module.exports = mongoose.model("User", UserSchema);
