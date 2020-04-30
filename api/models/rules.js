const mongoose = require('mongoose');

const RulesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    domain: {type: String, required: true, default: "BVV"},
    reference: { type: String, required: true, unique: true }, //no spaces allowed!
    issuer: { type: String, required: true },
    rules: {type: String, default: false, required: true},
    date_start: {type: Date, default: Date.now, required: true},
    date_end: {type: Date, default: null, required: false}
}, { collection: 'rules' });

module.exports = mongoose.model('Rules', RulesSchema);