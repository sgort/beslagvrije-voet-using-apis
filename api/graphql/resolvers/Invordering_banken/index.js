import Invordering_banken from "../../../models/invordering_banken";

export default {
  Query: {
    invordering_banken: async (parent, { _id }, context, info) => {
      return await Invordering_banken.findOne({ _id }).exec();
    },
    invorderingen_banken: async (parent, args, context, info) => {
      const res = await Invordering_banken.find({})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        _base_record: u._base_record,
        _baseline: u._baseline,
        maand:u.maand,
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
  },
};
