const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);

exports.User = User