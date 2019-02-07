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
    createSubategory(subcategoryInput: SubcategoryInput!): Subcategory
    updateSubcategory(id: ID!, categoryInput: CategoryInput!): Subcategory
    deleteSubcategory(id: ID!): Subcategory
`;

exports.subcategoryDef = subcategoryDef;
exports.subcategoryQuery = subcategoryQuery;
exports.subcategoryMutation = subcategoryMutation;