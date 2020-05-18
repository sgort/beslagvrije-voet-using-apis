const mongoose = require('mongoose');
const Invordering = require('../models/invordering');


exports.invordering_list = (req, res, next) => {
    Invordering.find({$or: [{ "_base_record": "false" }, { "_baseline": "true" }]})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                invorderingen: docs.map(doc => {
                    return {
                        BSN: doc.BSN,
                        beslag_object: doc.beslag_object,
                        beslaglegger: doc.beslaglegger,
                        openstaande_vordering: doc.openstaande_vordering,
                        beslagvrije_voet: doc.beslagvrije_voet,
                        invordering: doc.invordering
                    };
                })
            };
            console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_list_base_records = (req, res, next) => {
    Invordering.find({$or: [{ "_base_record": "true" }, { "_baseline": "true" }]})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                invorderingen: docs.map(doc => {
                    return {
                        BSN: doc.BSN,
                        beslag_object: doc.beslag_object,
                        beslaglegger: doc.beslaglegger,
                        openstaande_vordering: doc.openstaande_vordering,
                        beslagvrije_voet: doc.beslagvrije_voet,
                        invordering: doc.invordering
                    };
                })
            };
            console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_find_one = (req, res, next) => {
    const id = req.params.invorderingId;
    Invordering.find({ _id: { $eq: id } })
        .exec()
        .then(docs => {
            if (docs.length >= 1) {
                const response = {
                    count: docs.length,
                    invorderingen: docs.map(doc => {
                        return {
                            BSN: doc.BSN,
                            beslag_object: doc.beslag_object,
                            samenloop: doc.samenloop,
                            beslaglegger: doc.beslaglegger,
                            openstaande_vordering: doc.openstaande_vordering,
                            beslagvrije_voet: doc.beslagvrije_voet,
                            invordering: doc.invordering,
                            request: {
                                type: "GET_ALL_INVORDERINGEN",
                                url: "http://localhost:3000/invorderingen/"
                            }
                        };
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid Invordering found for provided invorderingId"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_create_one = (req, res, next) => {
    Invordering.insertMany(req.body)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created invordering(en) successfully",
                invorderingen: result.map(doc => {
                    return {
                        _id: doc._id,
                        BSN: doc.BSN,
                        beslag_object: doc.beslag_object,
                        samenloop: doc.samenloop,
                        beslaglegger: doc.beslaglegger,
                        openstaande_vordering: doc.openstaande_vordering,
                        beslagvrije_voet: doc.beslagvrije_voet,
                        invordering: doc.invordering
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_update_one = (req, res, next) => {
    const id = req.params.invorderingId;
    Invordering.updateMany({ _id: { $eq: id } }, { $set: req.body }, { upsert: true })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Invordering succesfully updated!",
                request: {
                    type: "GET_UPDATED_INVORDERING",
                    url: "http://localhost:3000/invorderingen/" + id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_delete_one = (req, res, next) => {
    const id = req.params.invorderingId;
    Invordering.deleteOne({ _id: { $eq: id } })
        .exec()
        .then(result => {
            if (result.deletedCount !== 0) {
                console.log(result)
                res.status(200).json({
                    message: "Invordering succesfully deleted from the collection"
                })
            } else {
                res.status(404).json({
                    message: "No valid Invordering found for provided invorderingId"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.invordering_delete_non_base_records = (req, res, next) => {
    Invordering.remove({ "_base_record": "false" })
        .exec()
        .then(result => {
            if (result.deletedCount !== 0) {
                console.log(result)
                res.status(200).json({
                    message: "Non base records succesfully deleted"
                })
            } else {
                res.status(404).json({
                    message: "No non base records found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};