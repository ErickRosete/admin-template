const Product = require("../../models/product");
const Subcategory = require("../../models/subcategory");

// const { dateToString } = require("../../helpers/date");

const transformProduct = product => {
    return {
        ...product._doc,
        subcategories: getSubcategories.bind(this, product.subcategories)
    };
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


const transformSubcategory = subcategory => {
    return {
        ...subcategory._doc,
        products: getProducts.bind(this, subcategory.products)
    };
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

exports.transformProduct = transformProduct;
exports.getProducts = getProducts;
exports.transformCategory = transformCategory;
exports.transformSubcategory = transformSubcategory;
exports.getSubcategories = getSubcategories;
