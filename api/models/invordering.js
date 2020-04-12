const mongoose = require('mongoose');

const invorderingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    BSN: { type: Number, required: true, unique: true },
    beslag_object: { type: String, required: false },
    samenloop: { type: Boolean, default: false, required: true },
    beslaglegger: { type: String, required: true },
    beslagvrije_voet: { type: Number, required: true }
}, { collection: 'invorderingen' });

module.exports = mongoose.model('Invordering', invorderingSchema);