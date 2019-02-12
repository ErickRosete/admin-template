const User = require("../../models/user");
const { transformUser, createAddress } = require("./merge");

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return { ...user._doc };
            });
        } catch (err) {
            throw err;
        }   
    },
    
    user: async (args, req) => {
        try {
            const user = await User.findById(args.id);
            return { ...user._doc };
        } catch (err) {
            throw err;
        }
    },
    // onClick = "holasss(this)"
    // // console.log(thj)
    // (params)=>{funcion2(params)}
    // (params)=>{
    //     console.log(params)
    // }
    createUser: async (args, req) => {
        // console.log(args)
        console.log(args.userInput.mainAddress)
        // (args) => { erick(args) };
        // erick.bind(this, args)
        // createAddress
        // createAddress.bind(this,args);
        // (args)=>createAddress.bind(this,args);
        createAddress(args)
        const user = User({
            ...args.userInput,
            mainAddress: "asdfadxfasdfasf"
        });
        try {
            const result = await user.save();
            return transformUser(result);
        } catch (err) {
            throw err;
        }
    },
};
