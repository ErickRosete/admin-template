const ShoppingCart = require("../../models/shopping-cart");
const ShoppingCartProduct = require("../../models/shopping-cart-product");
const Product = require("../../models/product");

const {
  transformShoppingCart,
  transformShoppingCartProduct
} = require("./merge");

module.exports = {
  shoppingCarts: async () => {
    try {
      const shoppingCarts = await ShoppingCart.find();
      return shoppingCarts.map(shoppingCart => {
        return transformShoppingCart(shoppingCart);
      });
    } catch (err) {
      throw err;
    }
  },
  shoppingCart: async args => {
    try {
      const shoppingCart = await ShoppingCart.findById(args.id);
      return transformShoppingCart(shoppingCart);
    } catch (err) {
      throw err;
    }
  },
  shoppingCartByUser: async args => {
    try {
      const shoppingCart = await ShoppingCart.findOne({ user: args.id });
      return transformShoppingCart(shoppingCart);
    } catch (err) {
      throw err;
    }
  },
  shoppingCartProducts: async () => {
    try {
      const shoppingCartProducts = await ShoppingCartProduct.find();
      return shoppingCartProducts.map(shoppingCartProduct => {
        return transformShoppingCartProduct(shoppingCartProduct);
      });
    } catch (err) {
      throw err;
    }
  },
  createShoppingCart: async args => {
    const shoppingCartInDB = await ShoppingCart.findOne({
      user: args.shoppingCartInput.user
    });
    if (shoppingCartInDB) {
      throw new Error("User Already has a shopping cart");
    }
    const shoppingCart = ShoppingCart({
      ...args.shoppingCartInput
    });
    try {
      const result = await shoppingCart.save();
      return transformShoppingCart(result);
    } catch (err) {
      throw err;
    }
  },
  updateShoppingCart: async args => {
    try {
      const shoppingCart = await ShoppingCart.findByIdAndUpdate(
        args.id,
        { ...args.shoppingCartInput },
        { new: true }
      );
      return transformShoppingCart(shoppingCart);
    } catch (err) {
      throw err;
    }
  },
  deleteShoppingCart: async args => {
    try {
      const shoppingCart = await ShoppingCart.findByIdAndDelete(args.id);
      return transformShoppingCart(shoppingCart);
    } catch (err) {
      throw err;
    }
  },
  addProductToShoppingCart: async args => {
    try {
      const shoppingCart = await ShoppingCart.findById(
        args.shoppingCartId
      ).populate("shoppingCartProducts");
      const shoppingCartProduct = shoppingCart.shoppingCartProducts.find(
        sCProduct => sCProduct.product == args.productId
      );
      if (shoppingCartProduct) {
        shoppingCartProduct.quantity += 1;
        await shoppingCartProduct.save();
        return transformShoppingCart(shoppingCart);
      } else {
        const newShoppingCartProduct = ShoppingCartProduct({
          product: args.productId,
          quantity: 1
        });
        const result = await newShoppingCartProduct.save();
        shoppingCart.shoppingCartProducts.push(result);
        const resultShoppingCart = await shoppingCart.save();
        return transformShoppingCart(resultShoppingCart);
      }
    } catch (err) {
      throw err;
    }
  },
  updateShoppingCartProduct: async args => {
    try {
      const shoppingCartProduct = await ShoppingCartProduct.findByIdAndUpdate(
        args.id,
        { ...args.shoppingCartProductInput },
        { new: true }
      );
      return transformShoppingCartProduct(shoppingCartProduct);
    } catch (err) {
      throw err;
    }
  },
  deleteShoppingCartProduct: async args => {
    try {
      const shoppingCartProduct = await ShoppingCartProduct.findByIdAndDelete(
        args.id
      );
      return transformShoppingCartProduct(shoppingCartProduct);
    } catch (err) {
      throw err;
    }
  }
};
