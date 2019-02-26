const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const blogEntryResolver = require("./blog-entry");
const productResolver = require("./product");
const addressResolver = require("./address");
const userResolver = require("./user");
const shoppingCartResolver = require("./shopping-cart");
const shopOrderResolver = require("./shop-order");

const rootResolver = {
  ...categoryResolver,
  ...productResolver,
  ...subcategoryResolver,
  ...blogEntryResolver,
  ...addressResolver,
  ...userResolver,
  ...shoppingCartResolver,
  ...shopOrderResolver
};

module.exports = rootResolver;
