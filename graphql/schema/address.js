type Address{
    _id: ID!
    street: String!
    exteriorNumber: Int!
    city: String!
    country: String!
    zipCode: Int!
}

input AddressInput{
    street: String!
    exteriorNumber: Int!
    city: String!
    country: String!
    zipCode: Int!
}

type RootMutation {

createAddress(addressInput: AddressInput): Address
}
