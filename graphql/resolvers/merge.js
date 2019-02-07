const Product = require("../../models/product");
const Category = require("../../models/category");
const Subcategory = require("../../models/subcategory");
const BlogEntry = require("../../models/blog-entry");

// const { dateToString } = require("../../helpers/date");

const transformProduct = product => {
    return {
        ...product._doc,
        subcategories: getSubcategories.bind(this, product.subcategories)
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
        subcategories: getSubcategories.bind(this, category.subcategories)
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

const transformSubcategory = subcategory => {
    return {
        ...subcategory._doc,
        products: getProducts.bind(this, subcategory.products)
    };
};

const getSubcategory = async id => {
    try {
        const subcategory = await Subcategory.findById(id);
        return transformSubcategory(subcategory);
    } catch (err) {
        throw err;
    }
};

const getSubcategories = async ids => {
    try {
        const subcategories = await Subcategory.find({ _id: { $in: ids } });
        return subcategories.map(subcategory => {
            return transformSubcategory(subcategory);
        });
    } catch (err) {
        throw err;
    }
};

const transformBlogEntry = blogEntry => {
    return {
        ...blogEntry._doc,
    };
};

const getBlogEntry = async id => {
    try {
        const blogEntry = await BlogEntry.findById(id);
        return transformBlogEntry(blogEntry);
    } catch (err) {
        throw err;
    }
};

const getBlogEntries = async ids => {
    try {
        const blogEntries = await BlogEntry.find({ _id: { $in: ids } });
        return blogEntries.map(BlogEntry => {
            return transformBlogEntry(BlogEntry);
        });
    } catch (err) {
        throw err;
    }
};

exports.transformProduct = transformProduct;
exports.getProduct = getProduct;
exports.getProducts = getProducts;

exports.transformCategory = transformCategory;
exports.getCategories = getCategories;
exports.getCategory = getCategory;

exports.transformSubcategory = transformSubcategory;
exports.getSubcategories = getSubcategories;
exports.getSubcategory = getSubcategory;

exports.transformBlogEntry = transformBlogEntry;
exports.getBlogEntries = getBlogEntries;
exports.getBlogEntry = getBlogEntry;
