const mongoose = require('mongoose');
const Credential = require('../models/credential');


exports.credential_list = (req, res, next) => {
    Credential.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                credentials: docs.map(doc => {
                    return {
                        _id: doc._id,
                        BSN: doc.BSN,
                        type: doc.type,
                        value: doc.value,
                        issuer: doc.issuer,
                        issued: doc.issued
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


exports.credential_find_one = (req, res, next) => {
    const id = req.params.credentialId;
    Credential.find({ _id: { $eq: id } })
        .exec()
        .then(docs => {
            if (docs.length >= 1) {
                const response = {
                    count: docs.length,
                    credentials: docs.map(doc => {
                        return {
                            _id: doc._id,
                            BSN: doc.BSN,
                            type: doc.type,
                            value: doc.value,
                            issuer: doc.issuer,
                            issued: doc.issued
                        };
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid Credential found for provided credentialId"
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


exports.credential_create_one = (req, res, next) => {
    Credential.insertMany(req.body)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created credential(s) successfully",
                credentials: result.map(doc => {
                    return {
                        BSN: doc.BSN,
                        type: doc.type,
                        value: doc.value,
                        issuer: doc.issuer,
                        issued: doc.issued
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


exports.credential_update_one = (req, res, next) => {
    const id = req.params.credentialId;
    Credential.updateMany({ _id: { $eq: id } }, { $set: req.body }, { upsert: true })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Credential succesfully updated!",
                request: {
                    type: "GET_UPDATED_CREDENTIAL",
                    url: "http://localhost:9000/credentials/" + id
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

exports.credential_delete_one = (req, res, next) => {
    const id = req.params.credentialId;
    Credential.deleteOne({ _id: { $eq: id } })
        .exec()
        .then(result => {
            if (result.deletedCount !== 0) {
                console.log(result)
                res.status(200).json({
                    message: "Credential succesfully deleted from the collection"
                })
            } else {
                res.status(404).json({
                    message: "No valid Credential found for provided credentialId"
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
