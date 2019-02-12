const categoryDef = `
    type Category {
        _id: ID!
        name: String!
        description: String
        subcategories: [Subcategory]
    }

    input CategoryInput{
        name: String
        description: String
        subcategories: [ID]
    }
`;

const categoryQuery = `
    categories: [Category!]!
    category(id: ID!): Category!
`;

const categoryMutation = `
    createCategory(categoryInput: CategoryInput!): Category
    updateCategory(id: ID!, categoryInput: CategoryInput!): Category
    deleteCategory(id: ID!): Category
`;

exports.categoryDef = categoryDef;
exports.categoryQuery = categoryQuery;
exports.categoryMutation = categoryMutation;