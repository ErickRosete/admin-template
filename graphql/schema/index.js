const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Address {
        _id: ID!
        street: String!
        exteriorNumber: Int!
        city: String
        postalCode: Int
    }
  
    input AddressInput{
        street: String!
        exteriorNumber: Int!
        city: String
        postalCode: Int
    }
  
    type BlogEntry {
        _id: ID!
        title: String!
        imageLink: String
        subtitle: String
        shortDescription: String
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    input BlogEntryInput{
        title: String!
        imageLink: String
        subtitle: String
        shortDescription: String
        description: String!
    }

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
        addresses: [Address!]!

        blog: [BlogEntry!]!
        blogEntry(id: ID!): BlogEntry!

        categories: [Category!]!
        category(id: ID!): Category!

        subcategories: [Subcategory!]!
        subcategory(id: ID!): Subcategory!

        products: [Product!]!
        product(id: ID!): Product
    }

    type RootMutation {
        createAddress(addressInput: AddressInput): Address
        createBlogEntry(blogEntryInput: BlogEntryInput): BlogEntry
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
