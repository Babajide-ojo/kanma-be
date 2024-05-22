// services/cloudinaryService.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "drzkozm7j",
  api_key: process.env.CLOUDINARY_API_KEY || "869858938578337",
  api_secret: process.env.CLOUDINARY_API_SECRET || "GBbGbUNmEe9xIa2cUjebj4YSt7E"
});

const uploadImage = async (file) => {
  console.log({file});
  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log({result});
    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImage };
