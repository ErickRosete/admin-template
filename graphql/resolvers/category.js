const Category = require("../../models/category");

const { transformCategory } = require("./merge");

module.exports = {
  categories: async () => {
    try {
      categories = await Category.find();
      return categories.map(category => {
        return transformCategory(category);
      });
    } catch (err) {
      throw err;
    }
  },

  createCategory: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const category = Category({
      title: args.categoryInput.title,
      description: args.categoryInput.description,
    });

    try {
      const result = await category.save();
      return transformCategory(result);
    } catch (err) {
      throw err;
    }
  }
};
