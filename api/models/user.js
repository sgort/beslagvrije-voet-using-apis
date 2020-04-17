const mongoose = require('mongoose');

/**
 * Schema for adding user signup
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, default: "Civil Servant" },
    phone: { type: String, required: true, default: "+31 6 123456" },
    organisation: {type: String, required: false},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);