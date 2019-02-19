const User = require("../../models/user");
const Product = require("../../models/product");
const ShoppingCartProduct = require("../../models/shopping-cart-product");
const Subcategory = require("../../models/subcategory");
const Address = require("../../models/address");
const DataLoader = require("dataloader");

// const { dateToString } = require("../../helpers/date");

const userLoader = new DataLoader(userIds => {
  return getUsers(userIds);
});

const getUsers = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};

const getUser = async userId => {
  try {
    return await userLoader.load(userId.toString());
  } catch (err) {
    throw err;
  }
};

const addressLoader = new DataLoader(addressIds => {
  return getAddresses(addressIds);
});

const getAddresses = async addressIds => {
  try {
    const addresses = await Address.find({ _id: { $in: addressIds } });
    return addresses.map(address => {
      return { ...address._doc };
    });
  } catch (err) {
    throw err;
  }
};

const getAddress = async addressId => {
  try {
    return await addressLoader.load(addressId.toString());
  } catch (err) {
    throw err;
  }
};

const productLoader = new DataLoader(productIds => {
  return getProducts(productIds);
});

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

const getProduct = async productId => {
  try {
    return await productLoader.load(productId.toString());
  } catch (err) {
    throw err;
  }
};

const shoppingCartProductLoader = new DataLoader(shoppingCartProductIds => {
  return getShoppingCartProducts(shoppingCartProductIds);
});

const getShoppingCartProducts = async shoppingCartProductIds => {
  try {
    const shoppingCartProducts = await ShoppingCartProduct.find({
      _id: { $in: shoppingCartProductIds }
    });
    return shoppingCartProducts.map(shoppingCartProduct => {
      return transformShoppingCartProduct(shoppingCartProduct);
    });
  } catch (err) {
    throw err;
  }
};

const subcategoryLoader = new DataLoader(subcategoryIds => {
  return getSubcategories(subcategoryIds);
});

const getSubcategories = async subcategoryIds => {
  try {
    const subcategories = await Subcategory.find({
      _id: { $in: subcategoryIds }
    });
    return subcategories.map(subcategory => {
      return transformSubcategory(subcategory);
    });
  } catch (err) {
    throw err;
  }
};

const transformShoppingCart = shoppingCart => {
  return {
    ...shoppingCart._doc,
    user: getUser.bind(this, shoppingCart.user),
    shoppingCartProducts: () =>
      shoppingCartProductLoader.loadMany(shoppingCart._doc.shoppingCartProducts)
  };
};

const transformShoppingCartProduct = shoppingCartProduct => {
  return {
    ...shoppingCartProduct._doc,
    product: getProduct.bind(this, shoppingCartProduct.product)
  };
};

const transformProduct = product => {
  return {
    ...product._doc,
    subcategories:  () => subcategoryLoader.loadMany(product._doc.subcategories)
  };
};

const transformUser = user => {
  return {
    ...user._doc,
    address: getAddress.bind(this, user.address),
    addresses: () => addressLoader.loadMany(user._doc.addreses)
  };
};

const transformCategory = category => {
  return {
    ...category._doc,
    subcategories: () => subcategoryLoader.loadMany(category._doc.subcategories)
  };
};

const transformSubcategory = subcategory => {
  return {
    ...subcategory._doc,
    products: () => productLoader.loadMany(subcategory._doc.products)
  };
};

exports.transformProduct = transformProduct;
exports.transformUser = transformUser;
exports.transformCategory = transformCategory;
exports.transformSubcategory = transformSubcategory;
exports.transformShoppingCartProduct = transformShoppingCartProduct;
exports.transformShoppingCart = transformShoppingCart;
