const mongoose = require('mongoose');
const RulesEngine = require('../models/rules');


exports.rulesengine_list = (req, res, next) => {
    RulesEngine.find().sort({date_start: -1}) // Sort desc by date_start to get active rules (ie first in array)
        .exec()
        .then(docs => {
            const response = {
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        domain: doc.domain,
                        reference: doc.reference,
                        issuer: doc.issuer,
                        rules: doc.rules,
                        date_start: doc.date_start,
                        date_end: doc.date_end,
                        ruleoflaw: doc.ruleoflaw
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
    const id = req.params.rulesId;
    RulesEngine.find({ _id: { $eq: id } })
        .exec()
        .then(docs => {
            if (docs.length >= 1) {
                const response = {
                    data: docs.map(doc => {
                        return {
                            _id: doc._id,
                            domain: doc.domain,
                            reference: doc.reference,
                            issuer: doc.issuer,
                            rules: doc.rules,
                            date_start: doc.date_start,
                            date_end: doc.date_end,
                            ruleoflaw: doc.ruleoflaw
                        };
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No valid Rules Engine found for provided rulesId"
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
                message: "Created rules successfully",
                rules: result.map(doc => {
                    return {
                        _id: doc._id,
                        domain: doc.domain,
                        reference: doc.reference,
                        issuer: doc.issuer,
                        rules: doc.rules,
                        date_start: doc.date_start,
                        date_end: doc.date_end,
                        ruleoflaw: doc.ruleoflaw
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


exports.rulesengine_update_one =  (req, res, next) => {
    const id = req.params.rulesId;
    RulesEngine.updateMany({ _id: { $eq: id } }, { $set: req.body }, { upsert: true })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Rules ${id} succesfully updated`,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.rulesengine_delete_one = (req, res, next) => {
    const id = req.params.rulesId;
    RulesEngine.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Rules ${id} deleted`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
