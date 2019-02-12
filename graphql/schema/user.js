const userDef = `
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String!
        birthdate: String!
        mainAddress: Address
        addresses: [Address]
    }

    input UserInput{
        name: String
        email: String
        password: String
        birthdate: String
        mainAddress: AddressInput
        addresses: [AddressInput]
    }
`;


const userQuery = `
    users: [User!]!
    user(id: ID!): User!
`;

const userMutation = `
    createUser(userInput: UserInput!): User
`;

// updateAddress(id: ID!,addressInput: AddressInput): Address
// deleteAddress(id: ID!): Address

exports.userDef = userDef;
exports.userQuery = userQuery;
exports.userMutation = userMutation;