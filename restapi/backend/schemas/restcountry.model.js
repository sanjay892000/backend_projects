const { default: mongoose } = require("mongoose");

const restModel = new mongoose.Schema({},{strict: false});

const restCountry = mongoose.model("RestCountry", restModel);
module.exports = restCountry;