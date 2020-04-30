const mongoose = require('mongoose');
const RulesEngine = require('../models/rules');


exports.rulesengine_list = (req, res, next) => {
    RulesEngine.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                rules: docs.map(doc => {
                    return {
                        domain: doc.domain,
                        reference: doc.reference,
                        issuer: doc.issuer,
                        rules: doc.rules,
                        date_start: doc.date_start,
                        date_end: doc.date_end
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


exports.rulesengine_find_one = (req, res, next) => {
    const id = req.params.referenceId;
    RulesEngine.find({ reference: { $eq: id } })
        .exec()
        .then(docs => {
            if (docs.length >= 1) {
                const response = {
                    count: docs.length,
                    rules: docs.map(doc => {
                        return {
                            domain: doc.domain,
                            reference: doc.reference,
                            issuer: doc.issuer,
                            rules: doc.rules,
                            date_start: doc.date_start,
                            date_end: doc.date_end
                        };
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid Rules Engine found for provided rulesengineId"
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


exports.rulesengine_create_one = (req, res, next) => {
    RulesEngine.insertMany(req.body)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created rules engine(s) successfully",
                rules: result.map(doc => {
                    return {
                        domain: doc.domain,
                        reference: doc.reference,
                        issuer: doc.issuer,
                        rules: doc.rules,
                        date_start: doc.date_start,
                        date_end: doc.date_end
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

