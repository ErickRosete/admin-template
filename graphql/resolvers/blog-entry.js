const BlogEntry = require("../../models/blog-entry");
const { transformBlogEntry } = require("./merge");

module.exports = {
    blog: async () => {
        try {
            const blog = await BlogEntry.find();
            return blog.map(blogEntry => {
                return transformBlogEntry(blogEntry);
            });
        } catch (err) {
            throw err;
        }
    },

    blogEntry: async (args) => {
        try {
            const blogEntry = await BlogEntry.findById(args.id);
            return transformBlogEntry(blogEntry);
        } catch (err) {
            throw err;
        }
    },

    createBlogEntry: async (args) => {
        // if (!req.isAuth) {
        //   throw new Error("Unauthenticated");
        // }
        const blogEntry = BlogEntry({
            title: args.blogEntryInput.title,
            subtitle: args.blogEntryInput.subtitle,
            imageLink: args.blogEntryInput.imageLink,
            shortDescription: args.blogEntryInput.shortDescription,
            description: args.blogEntryInput.description,
        });
        try {
            const result = await blogEntry.save();
            return transformBlogEntry(result);
        } catch (err) {
            throw err;
        }
    },

    deleteBlogEntry: async (args) => {
        try {
            const blogEntry = await BlogEntry.findByIdAndDelete(args.id);
            return transformBlogEntry(blogEntry);
        } catch (err) {
            throw err;
        }
    }
};