export default `
  type Invordering {
    _id: String!
    _base_record: Boolean!
    _baseline: Boolean!
    maand: String
    BSN: Int!
    beslag_object: String
    samenloop: Boolean!
    beslaglegger: String!
    openstaande_vordering: Float!
    beslagvrije_voet: Float
    afloscapaciteit: Float
    invordering: Float
  }
  type Invordering_base_record {
    _id: String!
    _base_record: Boolean!
    _baseline: Boolean!
    maand: String
    BSN: Int!
    beslag_object: String
    samenloop: Boolean!
    beslaglegger: String!
    openstaande_vordering: Float!
    beslagvrije_voet: Float
    afloscapaciteit: Float
    invordering: Float
  }
  type Query {
    invorderingen: [Invordering]
    invorderingen_base_records: [Invordering_base_record]
  }
`;