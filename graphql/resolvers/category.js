const Category = require("../../models/category");

const { transformCategory } = require("./merge");

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map(category => {
        return transformCategory(category);
      });
    } catch (err) {
      throw err;
    }
  },
  category: async (args, req) => {
    try {
      const category = await Category.findById(args.id);
      return transformCategory(category);
    } catch (err) {
      throw err;
    }
  },

  createCategory: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const category = Category({
      ...args.categoryInput
    });

    try {
      const result = await category.save();
      return transformCategory(result);
    } catch (err) {
      throw err;
    }
  },

  deleteCategory: async (args, req) => {
    try {
      const category = await Category.findByIdAndDelete(args.id);
      return transformCategory(category);
    } catch (err) {
      throw err;
    }
  }
};
