const express = require("express");
const Log = require("./logger/logger");

require("dotenv").config();

const app = express();
const PORT = 8000;

app.get("/api/test", async (req, res) => {
  await Log("backend", "error", "handler", "This is a test log");
  res.send("✅ API is working");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
