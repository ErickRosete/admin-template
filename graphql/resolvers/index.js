const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const blogEntryResolver = require("./blog-entry");
const productResolver = require("./product");
const addressResolver = require("./address");
const userResolver = require("./user");

const rootResolver = {
    ...categoryResolver,
    ...productResolver,
    ...subcategoryResolver,
    ...blogEntryResolver,
    ...addressResolver,
    ...userResolver

}

module.exports = rootResolver;