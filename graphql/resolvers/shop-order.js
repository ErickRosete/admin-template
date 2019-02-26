const ShoppingCart = require("../../models/shopping-cart");
const ShoppingCartProduct = require("../../models/shopping-cart-product");
const Address = require("../../models/address");
const ShopOrder = require("../../models/shop-order");
const ShopOrderProduct = require("../../models/shop-order-product");
const ShopOrderAddress = require("../../models/shop-order-address");
const mongoose = require("mongoose");

const { transformShopOrder } = require("./merge");

module.exports = {
  shopOrders: async () => {
    try {
      const shopOrders = await ShopOrder.find();
      return shopOrders.map(shopOrder => {
        return transformShopOrder(shopOrder);
      });
    } catch (err) {
      throw err;
    }
  },
  shopOrder: async args => {
    try {
      const shopOrder = await ShopOrder.findById(args.id);
      return transformShopOrder(shopOrder);
    } catch (err) {
      throw err;
    }
  },
  shopOrdersByUser: async args => {
    try {
      const shopOrders = await ShopOrder.find({ user: args.id });
      return shopOrders.map(shopOrder => {
        return transformShopOrder(shopOrder);
      });
    } catch (err) {
      throw err;
    }
  },
  createShopOrder: async args => {
    try {
      //Search shopping cart
      const shoppingCart = await ShoppingCart.findOne({
        user: args.shopOrderInput.userId
      }).populate({
        path: "shoppingCartProducts",
        populate: { path: "product" }
      });

      if (!shoppingCart) {
        throw new Error("User doesn't have a shopping cart");
      }

      if (shoppingCart.shoppingCartProducts.length === 0) {
        throw new Error("Shopping cart doesn't have products");
      }

      //map shopping cart products to shop order products
      //and delete shopping cart product
      const shopOrderProductIds = [];
      shoppingCart.shoppingCartProducts.forEach(async shoppingCartProduct => {
        const shopOrderProduct = ShopOrderProduct({
          ...shoppingCartProduct.product._doc,
          _id: mongoose.Types.ObjectId(),
          quantity: shoppingCartProduct.quantity,
          imageLink: shoppingCartProduct.product.imageLinks
            ? shoppingCartProduct.product.imageLinks[0]
            : ""
        });
        await ShoppingCartProduct.findByIdAndDelete(shoppingCartProduct._id);
        const shopOrderProductResult = await shopOrderProduct.save();
        shopOrderProductIds.push(shopOrderProductResult._id);
      });
      //delete shopping cart products references in shopping cart
      shoppingCart.shoppingCartProducts = [];
      await shoppingCart.save();

      //map address to shop order address
      const address = await Address.findById(args.shopOrderInput.addressId);
      if (!address) {
        throw new Error("Address doesn't exists");
      }
      const shopOrderAddress = ShopOrderAddress({
        ...address._doc,
        _id: mongoose.Types.ObjectId()
      });
      const shopOrderAddressResult = await shopOrderAddress.save();

      console.log(shopOrderProductIds);
      //create shop order
      const shopOrder = ShopOrder({
        user: args.shopOrderInput.userId,
        shopOrderAddress: shopOrderAddressResult._id,
        shopOrderProducts: shopOrderProductIds
      });

      console.log(shopOrder);
      const shopOrderResult = await shopOrder.save();
      return transformShopOrder(shopOrderResult);
    } catch (err) {
      throw err;
    }
  },
  deleteShopOrder: async args => {
    try {
      const shopOrder = await ShopOrder.findById(args.id);

      //delete shopOrderAddress
      await ShopOrderAddress.findByIdAndDelete(shopOrder.shopOrderAddress);

      //delete shopOrderProducts
      shopOrder.shopOrderProducts.forEach(async shopOrderProductId => {
        await ShopOrderProduct.findByIdAndDelete(shopOrderProductId);
      });

      const result = await ShopOrder.findByIdAndDelete(args.id);
      return transformShopOrder(result);
    } catch (err) {
      throw err;
    }
  }
};
