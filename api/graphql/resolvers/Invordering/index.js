import Invordering_banken from "../../../models/invordering_banken";
import Invordering_wehkamp from "../../../models/invordering_wehkamp";
import fetch from 'node-fetch';

export default {
    Query: {
        async invorderingen() {
            const banken = await fetch('http://localhost:9000/invorderingenbanken')
                .then(res => res.json());

            const wehkamp = await fetch('http://localhost:9000/invorderingenwehkamp')
                .then(res => res.json());

            return Promise.all([banken, wehkamp]).map(u => ({
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
};

