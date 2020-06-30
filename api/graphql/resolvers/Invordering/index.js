import Invordering_banken from "../../../models/invordering_banken";
import Invordering_wehkamp from "../../../models/invordering_wehkamp";
import Invordering_overheid from "../../../models/invordering_overheid";

export default {
    Query: {
        invorderingen: async (parent, args, context, info) => {
            let result = [];
            const banken = await Invordering_banken.find({$or: [{ "_base_record": "false" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(banken);

            const wehkamp = await Invordering_wehkamp.find({$or: [{ "_base_record": "false" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(wehkamp);

            const overheid = await Invordering_overheid.find({$or: [{ "_base_record": "false" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(overheid);

            return result.map(u => ({
                _id: u._id.toString(),
                _base_record: u._base_record,
                _baseline: u._baseline,
                maand: u.maand.toISOString(),
                BSN: u.BSN,
                beslag_object: u.beslag_object,
                samenloop: u.samenloop,
                beslaglegger: u.beslaglegger,
                openstaande_vordering: u.openstaande_vordering,
                beslagvrije_voet: u.beslagvrije_voet,
                afloscapaciteit: u.afloscapaciteit,
                invordering: u.invordering
            }));
        },
        invorderingen_base_records: async (parent, args, context, info) => {
            let result = [];
            const banken = await Invordering_banken.find({$or: [{ "_base_record": "true" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(banken);

            const wehkamp = await Invordering_wehkamp.find({$or: [{ "_base_record": "true" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(wehkamp);

            const overheid = await Invordering_overheid.find({$or: [{ "_base_record": "true" }, { "_baseline": "true" }]})
                .populate()
                .exec();
            result = result.concat(overheid);

            return result.map(u => ({
                _id: u._id.toString(),
                _base_record: u._base_record,
                _baseline: u._baseline,
                maand: u.maand.toISOString(),
                BSN: u.BSN,
                beslag_object: u.beslag_object,
                samenloop: u.samenloop,
                beslaglegger: u.beslaglegger,
                openstaande_vordering: u.openstaande_vordering,
                beslagvrije_voet: u.beslagvrije_voet,
                afloscapaciteit: u.afloscapaciteit,
                invordering: u.invordering
            }));
        }


    }

}


/**
 * Doesn't work: "Cannot return null for non-nullable field Invordering._id."
 *
export default {
    Query: {
        invorderingen: () => {
            let p1 = new Promise((resolve, reject) => {
                Invordering_banken.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });

            let p2 = new Promise((resolve, reject) => {
                Invordering_wehkamp.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });

            let p3 = new Promise((resolve, reject) => {
                Invordering_overheid.find({})
                    .populate()
                    .exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
            });

            let promise = Promise.all([p1, p2, p3]);

            return promise
                .then(function (data) {
                    data.forEach(function (data) {
                        console.log(data);
                    });
                })
                .catch(function (error) {
                    console.error('error', error);
                })
        }
    }
}
*/


/**
 * Doesn't work: "Cannot return null for non-nullable field Invordering._id."
 *
export default {
    Query: {
        invorderingen: () => {
            return Promise.all([
                new Promise((resolve, reject) => {
                    Invordering_banken.find({})
                        .populate()
                        .exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                }),
                new Promise((resolve, reject) => {
                    Invordering_wehkamp.find({})
                        .populate()
                        .exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                }),
                new Promise((resolve, reject) => {
                    Invordering_overheid.find({})
                        .populate()
                        .exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                })
            ])
        }
    }
}
*/

/**
 * Doesn't work: "response map is not a function"
 */
/*
export default {
    Query: {
        invorderingen: () => {
            let urls = [
                'http://localhost:9000/invorderingenbanken',
                'http://localhost:9000/invorderingenwehkamp',
                'http://localhost:9000/invorderingenoverheid'
            ];

            // map every url to the promise of the fetch
            let requests = urls.map(url => fetch(url));

            // Promise.all waits until all jobs are resolved
            const response = Promise.all(requests)
                .then(res => res.json());

            return response.map(u => ({
                _id: u._id.toString(),
                _base_record: u._base_record,
                _baseline: u._baseline,
                maand: u.maand,
                BSN: u.BSN,
                beslag_object: u.beslag_object,
                samenloop: u.samenloop,
                beslaglegger: u.beslaglegger,
                openstaande_vordering: u.openstaande_vordering,
                beslagvrije_voet: u.beslagvrije_voet,
                afloscapaciteit: u.afloscapaciteit,
                invordering: u.invordering
            }));

        }
    }
}
*/