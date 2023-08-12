const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

const subscriptions = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/subscribe", (req, res) => {
  const email = req.body.email;

  subscriptions.push({ email, subscribedAt: new Date() });

  res.json({ success: true });
});

app.get("/api/subscriptions", (req, res) => {
  res.json(subscriptions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
