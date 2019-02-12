const subcategoryDef = `
    type Subcategory {
        _id: ID!
        name: String!
        description: String
        products: [Product]
    }

    input SubcategoryInput{
        name: String!
        description: String
        products: [ProductInput]
    }
`;

const subcategoryQuery = `
    subcategories: [Subcategory!]!
    subcategory(id: ID!): Subcategory!
`;

const subcategoryMutation = `
    createSubcategory(subcategoryInput: SubcategoryInput!): Subcategory
    updateSubcategory(id: ID!, subcategoryInput: SubcategoryInput!): Subcategory
    deleteSubcategory(id: ID!): Subcategory
`;

exports.subcategoryDef = subcategoryDef;
exports.subcategoryQuery = subcategoryQuery;
exports.subcategoryMutation = subcategoryMutation;