const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
