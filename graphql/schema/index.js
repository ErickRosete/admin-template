const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Category {
    _id: ID!
    name: String!
    description: String
    products: [Product]
}

input CategoryInput{
    name: String!
    description: String
    products: [ProductInput]
}

type Product {
    _id: ID!
    name: String!
    description: String!
    quantity: Int
    categories: [Category]
}

input ProductInput{
    name: String!
    description: String
    products: [ProductInput]
}

type RootQuery {
    categories: [Category!]!
    products: [Product!]!
    category(id: String): [Category]
}

type RootMutation {
    createCategory(categoryInput: CategoryInput): Category
    createProduct(productInput: ProductInput): Product
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
