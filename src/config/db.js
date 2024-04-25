const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// connect to db based on environment
module.exports.connectDB = async () => {
    await mongoose.connect("mongodb+srv://Babajide:Maythird1.!@cluster0.azxmr.mongodb.net/juwsheyaj?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
};

// Disconnect db
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};

// Remove all the data for all db collections.
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    collection.deleteMany();
  }
};
