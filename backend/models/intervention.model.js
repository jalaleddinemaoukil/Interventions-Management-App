const mongoose = require("mongoose");
const { Schema } = mongoose;
const interventionSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  technician: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['planned', 'in_progress', 'completed', 'cancelled'], required: true },
  description: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model("Intervention", interventionSchema);
