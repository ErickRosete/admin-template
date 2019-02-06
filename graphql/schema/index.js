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
    category(id: String): Category
    products: [Product!]!
    product(id: String): Product
}

type RootMutation {
    createCategory(categoryInput: CategoryInput): Category
    deleteCategory(id: String): Category
    createProduct(productInput: ProductInput): Product
    deleteProduct(id: String): Category
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
