const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./src/config/db")
const userRoutes = require("./src/routes/UserRoutes")
const authRoutes = require("./src/routes/AuthRoutes")
const hotelRoutes = require("./src/routes/HotelRoomRoutes")

const app = express();


app.use(bodyParser.json());
app.use(cors());

db.connectDB()
// Routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
    res.send("Server is healthy")
})

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", hotelRoutes)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
