const { default: mongoose } = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://Shreyash:shreyash1234@cluster0.eyxgk.mongodb.net/voosh?retryWrites=true&w=majority"
);

module.exports = connection;
 