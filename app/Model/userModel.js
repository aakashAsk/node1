const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;


const User = new UserSchema({
  name: {type: String},
  email: {type: String},
  number: {type: Number},
  password: {type: String},
  profileImage: { type: String },
  role: { type: String },
  isActive: {type: Boolean, default:true},
}, {
  timestamps: true
});

module.exports = mongoose.model('user', User);