const categoryResolver = require("./category");
const productResolver = require("./product");

const rootResolver = {
    ...categoryResolver,
    ...productResolver
}

module.exports = rootResolver;