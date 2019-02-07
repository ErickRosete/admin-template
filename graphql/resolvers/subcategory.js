const Subcategory = require("../../models/subcategory");

const { transformSubcategory } = require("./merge");

module.exports = {
  subcategories: async () => {
    try {
      const subcategories = await Subcategory.find();
      return subcategories.map(subcategory => {
        return transformSubcategory(subcategory);
      });
    } catch (err) {
      throw err;
    }
  },

  subcategory: async (args) => {
    try {
      const subcategory = await Subcategory.findById(args.id);
      return transformSubcategory(subcategory);
    } catch (err) {
      throw err;
    }
  },

  createSubcategory: async (args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const subcategory = Subcategory({
      ...args.subcategoryInput
    });

    try {
      const result = await subcategory.save();
      return transformSubcategory(result);
    } catch (err) {
      throw err;
    }
  },

  deleteSubcategory: async (args, req) => {
    try {
      const subcategory = await Subcategory.findByIdAndDelete(args.id);
      return transformSubcategory(subcategory);
    } catch (err) {
      throw err;
    }
  }
};
