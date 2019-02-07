const Address = require("../../models/address");
module.exports = {
    addresses: async () => {
        try {
            const addresses = await Address.find();
            return addresses.map(address => {
                return { ...address._doc };
            });
        } catch (err) {
            throw err;
        }
    },
    address: async (args, req) => {
        try {
            const address = await Address.findById(args.id);
            return { ...address._doc };
        } catch (err) {
            throw err;
        }
    },
    createAddress: async (args, req) => {
        console.log(args)
        const address = Address({
            street: args.addressInput.street,
            exteriorNumber: args.addressInput.exteriorNumber,
            city: args.addressInput.city,
            country: args.addressInput.country,
            zipCode: args.addressInput.zipCode,
        });
        try {
            const result = await address.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },
};
