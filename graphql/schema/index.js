const { buildSchema } = require("graphql");
const { blogEntryDef, blogEntryQuery, blogEntryMutation } = require("./blog-entry");
const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { AddressDef, AddressQuery, AddressMutation } = require("./address");

module.exports = buildSchema(`
    ${blogEntryDef}
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${AddressDef}

    type RootQuery {
        ${blogEntryQuery}
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${AddressQuery}

    }

    type RootMutation {
        ${blogEntryMutation}
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${AddressMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
