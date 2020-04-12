const mongoose = require('mongoose');

const waterschapSchema = mongoose.Schema({
    WaterschapKey: { type: String, required: true, unique: true},
    Waterschapnaam: { type: String, required: true}
}, { collection: 'waterschappen' });

module.exports = mongoose.model('Waterschap', waterschapSchema);