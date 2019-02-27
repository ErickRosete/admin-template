const userDef = `
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String!
        birthdate: String!
        role: String!
        mainAddress: Address
        addresses: [Address]
    }

    input UserInput{
        name: String
        email: String
        password: String
        birthdate: String
        role: String
        mainAddress: AddressInput
        addresses: [ID]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
        role: String!
    }
`;


const userQuery = `
    users: [User!]!
    user(id: ID!): User
    userByEmail(email:String!): User
    login(userInput: UserInput!): AuthData!
`;

const userMutation = `
    addAddress(userId:ID!,addressId:ID!): User
    createUser(userInput: UserInput!): User
    updateUser(id: ID!,userInput: UserInput): User
    updateUserPassword(id: ID!,password: String): User
`;

// updateAddress(id: ID!,addressInput: AddressInput): Address
// deleteAddress(id: ID!): Address

exports.userDef = userDef;
exports.userQuery = userQuery;
exports.userMutation = userMutation;