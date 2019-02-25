const jwt = require("jsonwebtoken");
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

    login: async args => {
        const user = await User.findOne({ email: args.userInput.email });
        // console.log(user)
        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const isEqual = await bcrypt.compare(
          args.userInput.password,
          user.password
        );
        // console.log(isEqual)
        if (!isEqual) {
          throw new Error("Invalid Credentials");
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "asecretkeynotknownbyanyone",
          { expiresIn: "2h" }
        );
        return {
          userId: user.id,
          token: token,
          tokenExpiration: 2
        };
    },

    createUser: async (args, req) => {
        // console.log(args.userInput.mainAddress)
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        // console.log(`hashed Password ${hashedPassword}`)
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
                ...args.userInput,
                password: hashedPassword
            })
        }
        try {
            const result = await user.save();
            return transformUser(result);
        } catch (err) {
            throw err;
        }
    },
    updateUserPassword:async(args,req)=>{
        console.log(args)
        try {
            const user = await User.findByIdAndUpdate(
              args.id,
              { password:args.password },
              { new: true }
            );
            return {...user._doc}
            // return transformProduct(product);
          } catch (err) {
            console.log(err)
            throw err;
          }
    }
};
