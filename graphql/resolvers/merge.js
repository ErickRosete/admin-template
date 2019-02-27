const User = require("../../models/user");
const Product = require("../../models/product");
const ShoppingCartProduct = require("../../models/shopping-cart-product");
const Subcategory = require("../../models/subcategory");
const Address = require("../../models/address");
const ShopOrderProduct = require("../../models/shop-order-product");
const ShopOrderAddress = require("../../models/shop-order-address");
const DataLoader = require("dataloader");

const { dateToString } = require("../../helpers/date");

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

const shopOrderAddressLoader = new DataLoader(shopOrderAddressIds => {
  return getShopOrderAddresses(shopOrderAddressIds);
});

const getShopOrderAddresses = async shopOrderAddressIds => {
  try {
    const shopOrderAddresses = await ShopOrderAddress.find({
      _id: { $in: shopOrderAddressIds }
    });
    return shopOrderAddresses.map(shopOrderAddress => {
      return { ...shopOrderAddress._doc };
    });
  } catch (err) {
    throw err;
  }
};

const getShopOrderAddress = async shopOrderAddressId => {
  try {
    return await shopOrderAddressLoader.load(shopOrderAddressId.toString());
  } catch (err) {
    throw err;
  }
};

const shopOrderProductLoader = new DataLoader(shopOrderProductIds => {
  return getShopOrderProducts(shopOrderProductIds);
});

const getShopOrderProducts = async shopOrderProductIds => {
  try {
    const shopOrderProducts = await ShopOrderProduct.find({
      _id: { $in: shopOrderProductIds }
    });
    return shopOrderProducts.map(shopOrderProduct => {
      return { ...shopOrderProduct._doc };
    });
  } catch (err) {
    throw err;
  }
};

const transformShopOrder = shopOrder => {
  return {
    ...shopOrder._doc,
    user: getUser.bind(this, shopOrder.user),
    shopOrderAddress: getShopOrderAddress.bind(
      this,
      shopOrder.shopOrderAddress
    ),
    shopOrderProducts: () =>
      shopOrderProductLoader.loadMany(shopOrder.shopOrderProducts),
    createdAt: dateToString(shopOrder.createdAt)
  };
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
    subcategories: () => subcategoryLoader.loadMany(product._doc.subcategories)
  };
};

const transformUser = user => {
  let res={...user._doc,
    password: null,
    address: getAddress.bind(this, user.address),
  }
  if(user._doc.addresses.length>0){
    res.addresses= () => addressLoader.loadMany(user._doc.addreses)
  }
  else{res.addresses=null}
  return res
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
exports.transformShopOrder = transformShopOrder;
