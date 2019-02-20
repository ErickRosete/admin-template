const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { transformUser, createAddress } = require("./merge");

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            // return users.map(user => {
            //     return { ...user._doc };
            // });
            return users.map(user => {
                return transformUser(user);
            });
        } catch (err) {
            throw err;
        }   
    },
    
    user: async (args, req) => {
        try {
            const user = await User.findById(args.id);
            return transformUser(user);
        } catch (err) {
            throw err;
        }
    },
    userByEmail:async(args,req)=>{
        const userInDB = await User.findOne({ email: args.email});
        if (userInDB) {
            return {...userInDB._doc}
        }
        else{
            throw new Error("User does not Exists");
        }
    },
    createUser: async (args, req) => {
        console.log(args.userInput.mainAddress)
        let user;
        const userInDB = await User.findOne({ email: args.userInput.email });
        if (userInDB) {
          throw new Error("User Already Exists");
        }
        if( args.userInput.mainAddress!=null){
            const result = await createAddress(args.userInput.mainAddress)
            console.log(`la creacion dejo ${result}`)
            user = User({
                ...args.userInput,
                mainAddress: result
            });
        }
        else{
            user = User({
                ...args.userInput})
        }
        try {
            const result = await user.save();
            return transformUser(result);
        } catch (err) {
            throw err;
        }
    },
};
