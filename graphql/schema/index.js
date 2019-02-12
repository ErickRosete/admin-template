const { buildSchema } = require("graphql");
const { blogEntryDef, blogEntryQuery, blogEntryMutation } = require("./blog-entry");
const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { addressDef, addressQuery, addressMutation } = require("./address");
const { userDef, userQuery, userMutation } = require("./user");

module.exports = buildSchema(`
    ${blogEntryDef}
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${addressDef}
    ${userDef}

    type RootQuery {
        ${blogEntryQuery}
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${addressQuery}
        ${userQuery}

    }

    type RootMutation {
        ${blogEntryMutation}
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${addressMutation}
        ${userMutation}

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
