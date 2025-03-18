require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
