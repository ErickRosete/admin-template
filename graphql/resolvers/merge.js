const Product = require("../../models/product");
const Category = require("../../models/category");

// const { dateToString } = require("../../helpers/date");

const transformProduct = product => {
    return {
        ...product._doc,
        categories: getCategories.bind(this, product.categories)
    };
};

const getProduct = async productId => {
    try {
        const product = await Product.findById(productId);
        return transformProduct(product);
    } catch (err) {
        throw err;
    }
};

const getProducts = async productIds => {
    try {
        const products = await Product.find({ _id: { $in: productIds } });
        return products.map(product => {
            return transformProduct(product);
        });
    } catch (err) {
        throw err;
    }
};

const transformCategory = category => {
    return {
        ...category._doc,
        product: getProducts.bind(this, product.categories)

    };
};

const getCategory = async categoryId => {
    try {
        const category = await Category.findById(categoryId);
        return transformCategory(category);
    } catch (err) {
        throw err;
    }
};

const getCategories = async categoryIds => {
    try {
        const categories = await Category.find({ _id: { $in: categoryIds } });
        return categories.map(category => {
            return transformCategory(category);
        });
    } catch (err) {
        throw err;
    }
};

exports.getProduct = getProduct;
exports.getProducts = getProducts;

exports.getCategories = getCategories;
exports.getCategory = getCategory;

exports.transformProduct = transformProduct;
exports.transformCategory = transformCategory;
