const { buildSchema } = require("graphql");
const { blogEntryDef, blogEntryQuery, blogEntryMutation } = require("./blog-entry");

module.exports = buildSchema(`
    ${blogEntryDef}
    type Category {
        _id: ID!
        name: String!
        description: String
        subcategories: [Subcategory]
    }

    input CategoryInput{
        name: String!
        description: String
        subcategories: [SubcategoryInput]
    }

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

    type Product {
        _id: ID!
        name: String!
        description: String!
        quantity: Int
        subcategories: [Subcategory]
    }

    input ProductInput{
        name: String!
        description: String
        subcategories: [SubcategoryInput]
    }

    type RootQuery {
        ${blogEntryQuery}

        categories: [Category!]!
        category(id: ID!): Category!

        subcategories: [Subcategory!]!
        subcategory(id: ID!): Subcategory!

        products: [Product!]!
        product(id: ID!): Product
    }

    type RootMutation {
        ${blogEntryMutation}
        
        createCategory(categoryInput: CategoryInput): Category
        deleteCategory(id: ID!): Category
        createSubategory(subcategoryInput: SubcategoryInput): Subcategory
        deleteSubcategory(id: ID!): Subcategory
        createProduct(productInput: ProductInput): Product
        deleteProduct(id: ID!): Product
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
