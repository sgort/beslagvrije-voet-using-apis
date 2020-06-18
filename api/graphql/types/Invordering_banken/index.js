export default `
  type Invordering_banken {
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
    invordering_banken(_id: ID!): Invordering_banken!
    invorderingen_banken: [Invordering_banken!]!
  }

`;
