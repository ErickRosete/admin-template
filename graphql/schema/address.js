const AddressDef = `
        type Address{
            _id: ID!
            street: String!
            exteriorNumber: Int!
            city: String!
            country: String!
            zipCode: Int!
        }

        input AddressInput{
            street: String
            exteriorNumber: Int
            city: String
            country: String
            zipCode: Int
        }
`;

const AddressQuery = `
    addresses: [Address!]!
    address(id: ID!): Address!
`;

const AddressMutation = `
    createAddress(addressInput: AddressInput): Address
    updateAddress(id: ID!,addressInput: AddressInput): Address
    deleteAddress(id: ID!): Address
`;

exports.AddressDef = AddressDef;
exports.AddressQuery = AddressQuery;
exports.AddressMutation = AddressMutation;