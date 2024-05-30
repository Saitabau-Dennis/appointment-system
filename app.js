const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ussdRoutes = require("./routes/ussd");
const dbConfig = require("./config/db");
const africastalking = require('./config/africastalking');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.url);

app.use("/ussd", ussdRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
