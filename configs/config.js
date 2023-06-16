const { default: mongoose } = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/voosh");

module.exports = connection;
