const express = require("express");
const mongoose = require("mongoose");
const client = require("prom-client");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://db:27017/appdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Schema
const Message = mongoose.model("Message", {
  message: String
});

// Routes
app.post("/save", async (req, res) => {
  await Message.create({ message: req.body.message });
  res.json({ status: "Saved" });
});

app.get("/data", async (req, res) => {
  const data = await Message.find();
  res.json(data);
});

/* -------- Monitoring -------- */

client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

/* ----------------------------- */

app.listen(80, () => {
  console.log("Backend running on port 80");
});
