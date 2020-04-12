const mongoose = require('mongoose');

const gemeenteSchema = mongoose.Schema({
    Gemeentecode: { type: Number, required: true},
    GemeentecodeGM: { type: String, required: true, unique: true},
    Gemeentenaam: { type: String, required: true},
    Provinciecode: { type: Number, required: true},
    ProvinciecodePV: { type: String, required: true},
    Provincienaam: { type: String, required: true}
}, { collection: 'gemeenten' });

module.exports = mongoose.model('Gemeente', gemeenteSchema);