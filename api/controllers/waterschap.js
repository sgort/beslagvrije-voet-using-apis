const mongoose = require('mongoose');
const Waterschap = require('../models/waterschap');

exports.waterschap_list = (req, res, next) => {
    Waterschap.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                waterschappen: docs.map(doc => {
                    return {
                        WaterschapKey: doc.WaterschapKey,
                        Waterschapnaam: doc.Waterschapnaam,
                        request: {
                            type: "GET_SPECIFIC_WATERSCHAP",
                            url: "http://localhost:3000/waterschappen/" + doc.WaterschapKey
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

exports.waterschap_find_one = (req, res, next) => {
    const id = req.params.waterschapId;
    Waterschap.find({ WaterschapKey: { $eq: id } })
        .exec()
        .then(docs => {
            if (docs.length >= 1) {
                const response = {
                    count: docs.length,
                    waterschappen: docs.map(doc => {
                        return {
                            WaterschapKey: doc.WaterschapKey,
                            Waterschapnaam: doc.Waterschapnaam,
                            request: {
                                type: "GET_ALL_WATERSCHAPPEN",
                                url: "http://localhost:3000/waterschappen/"
                            }
                        };
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid Waterschap found for provided WaterschapKey"
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

exports.waterschap_create_one = (req, res, next) => {
    Waterschap.insertMany(req.body)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created waterschap(pen) successfully",
                waterschappen: result.map(doc => {
                    return {
                        WaterschapKey: doc.WaterschapKey,
                        Waterschapnaam: doc.Waterschapnaam,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/waterschappen/" + doc.WaterschapKey
                        }
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

exports.waterschap_update_one =  (req, res, next) => {
    const id = req.params.waterschapId;
    Waterschap.updateMany({ WaterschapKey: { $eq: id } }, { $set: req.body }, { upsert: true })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Waterschap succesfully updated!",
                request: {
                    type: "GET_UPDATED_WATERSCHAP",
                    url: "http://localhost:3000/waterschappen/" + id
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

exports.waterschap_delete_one =  (req, res, next) => {
    const id = req.params.waterschapId;
    Waterschap.deleteOne({ WaterschapKey: { $eq: id } })
        .exec()
        .then(result => {
            if (result.deletedCount !== 0) {
                console.log(result)
                res.status(200).json({
                    message: "Waterschap succesfully deleted from the collection"
                })
            } else {
                res.status(404).json({
                    message: "No valid Waterschap found for provided WaterschapKey"
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