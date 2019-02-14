const productDef = `
    type Product {
        _id: ID!
        name: String!
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [Subcategory]
    }

    input ProductInput{
        name: String
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [ID]
    }
`;

const productQuery = `
    products: [Product!]!
    product(id: ID!): Product
`;

const productMutation = `
    createProduct(productInput: ProductInput!): Product
    updateProduct(id: ID!, productInput: ProductInput!): Product
    deleteProduct(id: ID!): Product
`;

exports.productDef = productDef;
exports.productQuery = productQuery;
exports.productMutation = productMutation;