const { buildSchema } = require("graphql");
const { blogEntryDef, blogEntryQuery, blogEntryMutation } = require("./blog-entry");
const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");

module.exports = buildSchema(`
    ${blogEntryDef}
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}

    type RootQuery {
        ${blogEntryQuery}
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
    }

    type RootMutation {
        ${blogEntryMutation}
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
