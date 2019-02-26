const { buildSchema } = require("graphql");
const {
  blogEntryDef,
  blogEntryQuery,
  blogEntryMutation
} = require("./blog-entry");
const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const {
  subcategoryDef,
  subcategoryQuery,
  subcategoryMutation
} = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { addressDef, addressQuery, addressMutation } = require("./address");
const { userDef, userQuery, userMutation } = require("./user");
const {
  shoppingCartDef,
  shoppingCartQuery,
  shoppingCartMutation
} = require("./shopping-cart");
const {
  shopOrderDef,
  shopOrderQuery,
  shopOrderMutation
} = require("./shop-order");

module.exports = buildSchema(`
    ${blogEntryDef}
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${addressDef}
    ${userDef}
    ${shoppingCartDef}
    ${shopOrderDef}

    type RootQuery {
        ${blogEntryQuery}
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${addressQuery}
        ${userQuery}
        ${shoppingCartQuery}
        ${shopOrderQuery}
    }

    type RootMutation {
        ${blogEntryMutation}
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${addressMutation}
        ${userMutation}
        ${shoppingCartMutation}
        ${shopOrderMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
