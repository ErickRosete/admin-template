const productDef = `
    type Product {
        _id: ID!
        name: String!
        description: String
        products: [Product]
    }

    input ProductInput{
        name: String!
        description: String
        products: [ProductInput]
    }
`;

const productQuery = `
    products: [Product!]!
    product(id: ID!): Product
`;

const productMutation = `
    createProduct(productInput: ProductInput): Product
    deleteProduct(id: ID!): Product
`;

exports.productDef = productDef;
exports.productQuery = productQuery;
exports.productMutation = productMutation;