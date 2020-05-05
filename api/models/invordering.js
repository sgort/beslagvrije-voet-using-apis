const mongoose = require('mongoose');

const invorderingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _base_record: {type: Boolean, default: false, required: true},
    BSN: { type: Number, required: true },
    beslag_object: { type: String, required: false },
    samenloop: { type: Boolean, default: false, required: true },
    beslaglegger: { type: String, required: true },
    openstaande_vordering: {type: Number, required: true},
    beslagvrije_voet: { type: Number, required: true },
    invordering: {type: Number, required: true}
}, { collection: 'invorderingen' });

module.exports = mongoose.model('Invordering', invorderingSchema);