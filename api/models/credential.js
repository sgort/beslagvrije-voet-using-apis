const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    BSN: { type: Number, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
    issuer: { type: String, required: true },
    issued: {type: Boolean, default: false, required: true}
}, { collection: 'credentials' });

module.exports = mongoose.model('Credential', credentialSchema);