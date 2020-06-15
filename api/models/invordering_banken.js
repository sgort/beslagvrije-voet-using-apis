const mongoose = require('mongoose');

const invorderingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _base_record: {type: Boolean, default: false, required: true},
    _baseline: {type: Boolean, default: false, required: true},
    maand: { type: Date, required: false, default: null},
    BSN: { type: Number, required: true },
    beslag_object: { type: String, required: false },
    samenloop: { type: Boolean, default: false, required: true },
    beslaglegger: { type: String, required: true },
    openstaande_vordering: {type: Number, required: true},
    beslagvrije_voet: { type: Number, required: false },
    afloscapaciteit: { type: Number, required: false},
    invordering: {type: Number, required: false}
}, { collection: 'invorderingen_banken' });

module.exports = mongoose.model('Invordering_Banken', invorderingSchema);