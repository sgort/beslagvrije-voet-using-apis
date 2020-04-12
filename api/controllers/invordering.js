const mongoose = require('mongoose');
const Invordering = require('../models/invordering');


exports.invordering_list = (req, res, next) => {
    Invordering.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                invorderingen: docs.map(doc => {
                    return {
                        BSN: doc.BSN,
                        beslag_object: doc.beslag_object,
                        samenloop: doc.samenloop,
                        beslaglegger: doc.beslaglegger,
                        beslagvrije_voet: doc.beslagvrije_voet,
                        request: {
                            type: "GET_SPECIFIC_INVORDERING",
                            url: "http://localhost:3000/invorderingen/" + doc._id
                        }
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
                    gemeenten: docs.map(doc => {
                        return {
                            BSN: doc.BSN,
                            beslag_object: doc.beslag_object,
                            samenloop: doc.samenloop,
                            beslaglegger: doc.beslaglegger,
                            beslagvrije_voet: doc.beslagvrije_voet,
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
                        BSN: doc.BSN,
                        beslag_object: doc.beslag_object,
                        samenloop: doc.samenloop,
                        beslaglegger: doc.beslaglegger,
                        beslagvrije_voet: doc.beslagvrije_voet
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
