const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { transformUser, createAddress } = require("./merge");
// var GraphQLError = require('graphql/error'); // CommonJS
const { GraphQLError } =require('graphql');
var mongoose = require('mongoose');

// const { UserInputError  } =require('apollo-server')
// import { UserInputError } from 'apollo-server';


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
            // if (args.id != "metadata") {
            // }
            console.log(`el id es valido ${mongoose.Types.ObjectId.isValid(args.id )}`); // false
            // if(!mongoose.Types.ObjectId.isValid(args.id )){
            //     throw new GraphQLError("Formato inadecuado de Id principal");
            // }
            const userInDB = await User.findById(args.id);
            console.log(userInDB)
            if (userInDB) {
                // return {...userInDB._doc}
                return transformUser(userInDB);
            }
            else{
                throw new Error("User does not Exists");
            }
        } catch (err) {
            console.log(`error: ${err.message}`)
            if(err.message==="User does not Exists") throw err.message;
            else{
                
                throw new GraphQLError("Formato inadecuado de Id");
                // return "formato inadecuado de id"
                // throw {status: 403, message: 'Formato inadecuado de Id'};
                // UserInputError("Formato inadecuado de Id");
                // throw new UserInputError(
                //     'Failed to get events due to validation errors',
                //     { validationErrors }
                //   );
            }
        }
    },

    userByEmail:async(args,req)=>{
        try{
            const userInDB = await User.findOne({ email: args.email});
            if (userInDB) {
                return {...userInDB._doc}
            }
            else{
                throw new Error("User does not Exists");
            }
        }
        catch (err) {
            throw err;
        }
    },

    login: async args => {
        const user = await User.findOne({ email: args.userInput.email });
        console.log(user)
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
        const expiresIn="2h"
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "asecretkeynotknownbyanyone",
          { expiresIn}
        );
        console.log(user.role)
        return {
          userId: user.id,
          token: token,
          tokenExpiration: expiresIn,
          role: user.role
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
    addAddress:async(args,req)=>{
        console.log("args")
        console.log(args)
        try {
            const userInDB = await User.findById(args.userId);
            // console.log(userInDB.addresses)
            userInDB.addresses.push(args.addressId)
            // console.log(userInDB.addresses)
            // return {...userInDB._doc}
            const result = await userInDB.save();
            console.log(result)
            return transformUser(result);
        // return transformProduct(product);
        } catch (err) {
        console.log(err)
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
