const ShoppingCart = require("../../models/shopping-cart");
const ShoppingCartProduct = require("../../models/shopping-cart-product");

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
    try {
      const shoppingCartInDB = await ShoppingCart.findOne({
        user: args.shoppingCartInput.user
      });
      if (shoppingCartInDB) {
        throw new Error("User Already has a shopping cart");
      }
      const shoppingCart = ShoppingCart({
        ...args.shoppingCartInput
      });
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
  },
  addProductToShoppingCart: async args => {
    try {
      //search shopping cart
      const shoppingCart = await ShoppingCart.findById(
        args.shoppingCartId
      ).populate("shoppingCartProducts");

      if (!shoppingCart) throw new Error("Incorrect Shopping cart ID");

      //Search product in shopping cart
      const shoppingCartProduct = shoppingCart.shoppingCartProducts.find(
        sCProduct => sCProduct.product == args.productId
      );
      //Modify quantity when it exists
      if (shoppingCartProduct) {
        shoppingCartProduct.quantity += 1;
        await shoppingCartProduct.save();
        return transformShoppingCart(shoppingCart);
      }

      //Create Shopping Cart Product when it doesn't
      const newShoppingCartProduct = ShoppingCartProduct({
        product: args.productId,
        quantity: 1
      });
      const result = await newShoppingCartProduct.save();
      shoppingCart.shoppingCartProducts.push(result);
      const resultShoppingCart = await shoppingCart.save();
      return transformShoppingCart(resultShoppingCart);
    } catch (err) {
      throw err;
    }
  },
  addProductToUserShoppingCart: async args => {
    try {
      let shoppingCart = await ShoppingCart.findOne({
        user: args.userId
      }).populate("shoppingCartProducts");

      if (!shoppingCart) {
        //create shopping cart
        shoppingCart = ShoppingCart({
          user: args.userId,
          shoppingCartProducts: []
        });
      } else {
        //search product in shopping cart
        const shoppingCartProduct = shoppingCart.shoppingCartProducts.find(
          sCProduct => sCProduct.product == args.productId
        );

        //modify quantity if product exists
        if (shoppingCartProduct) {
          shoppingCartProduct.quantity += 1;
          await shoppingCartProduct.save();
          return transformShoppingCart(shoppingCart);
        }
      }

      //add product to shopping cart
      const newShoppingCartProduct = ShoppingCartProduct({
        product: args.productId,
        quantity: 1
      });
      const result = await newShoppingCartProduct.save();
      shoppingCart.shoppingCartProducts.push(result);
      const resultShoppingCart = await shoppingCart.save();
      return transformShoppingCart(resultShoppingCart);
    } catch (err) {
      throw err;
    }
  }
};
