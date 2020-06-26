export default `
  type User {
    id: String!
    name: String!
    email: String!
    age: Int
  }
  type Query {
    user(id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!, age: Int): User
    editUser(id: String, name: String, email: String, age: Int): User
    deleteUser(id: String, name: String, email: String, age: Int): User
  }
`;