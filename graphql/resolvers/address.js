const Address = require("../../models/address");
module.exports = {
    addresses: async () => {
        try {
            const addresses = await Address.find();
        } catch (err) {
            throw err;
        }
    },
    address: async (args, req) => {
        try {
            const address = await Address.findById(args.id);
        } catch (err) {
            throw err;
        }
    },
    createAddress: async (args, req) => {
        const address = Address({
            street: args.addressInput.street,
            exteriorNumber: args.addressInput.exteriorNumber,
            city: args.addressInput.city,
            country: args.addressInput.country,
            zipCode: args.addressInput.zipCode,
        });
        try {
            const result = await address.save();
        } catch (err) {
            throw err;
        }
    },
};
