const { default: mongoose } = require("mongoose");

const googleSchema = mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
});

const googleModel = mongoose.model("google", googleSchema);

module.exports = googleModel;
