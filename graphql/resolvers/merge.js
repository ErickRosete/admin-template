const Product = require("../../models/product");
const Subcategory = require("../../models/subcategory");
const Address = require("../../models/address");

// const { dateToString } = require("../../helpers/date");

const transformProduct = product => {
    return {
        ...product._doc,
        subcategories: getAddress.bind(this, product.subcategories)
    };
};

const transformUser = user => {
    return {
        ...user._doc,
        address: getAddress.bind(this, user.address),
        addresses: getAddresses.bind(this, user.addresses)
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

const getAddress = async ids => {
    try {
        const subcategories = await Subcategory.find({ _id: { $in: ids } });
        return subcategories.map(subcategory => {
            return transformSubcategory(subcategory);
        });
    } catch (err) {
        throw err;
    }
};

const getAddresses = async ids => {
    try {
        const subcategories = await Subcategory.find({ _id: { $in: ids } });
        return subcategories.map(subcategory => {
            return transformSubcategory(subcategory);
        });
    } catch (err) {
        throw err;
    }
};

const createAddress = async (args, req) => {
    console.log("creando address")
    console.log(args)
    const address = Address({
        ...args,
    });
    try {
        const result = await address.save();
        return  result._doc._id ;
    } catch (err) {
        throw err;
    }
};

exports.transformProduct = transformProduct;
exports.transformUser = transformUser;
exports.getProducts = getProducts;
exports.transformCategory = transformCategory;
exports.transformSubcategory = transformSubcategory;
exports.getSubcategories = getSubcategories;
exports.createAddress = createAddress;
