const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const blogEntryResolver = require("./blog-entry");
const productResolver = require("./product");

const rootResolver = {
    ...categoryResolver,
    ...productResolver,
    ...subcategoryResolver,
    ...blogEntryResolver
}

module.exports = rootResolver;