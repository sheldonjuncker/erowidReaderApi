import mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    address: String,
    type: String,
    active: Boolean,
  },
  { timestamps: false }
);

const Contact = mongoose.models.Contact || mongoose.model('contact', contactSchema);

export { contactSchema };
export default Contact;
