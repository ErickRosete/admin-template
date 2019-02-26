const shopOrderDef = `
    type ShopOrder {
        _id: ID!
        user: User!
        shopOrderAddress: ShopOrderAddress!
        shopOrderProducts: [ShopOrderProduct]
        createdAt: String!
        updatedAt: String!
    }

    input ShopOrderInput {
        userId: ID
        addressId: ID
    }

    type ShopOrderProduct {
        _id: ID!
        name: String
        price: Float
        quantity: Int
        imageLink: String
    }

    type ShopOrderAddress {
        _id: ID!
        street: String!
        exteriorNumber: Int!
        city: String!
        country: String!
        zipCode: Int!
    }
`;

const shopOrderQuery = `
    shopOrders: [ShopOrder]
    shopOrdersByUser(id: ID!): [ShopOrder]
    shopOrder(id: ID!): ShopOrder
`;

const shopOrderMutation = `
    createShopOrder(shopOrderInput: ShopOrderInput!): ShopOrder
    deleteShopOrder(id: ID!): ShopOrder
`;

exports.shopOrderDef = shopOrderDef;
exports.shopOrderQuery = shopOrderQuery;
exports.shopOrderMutation = shopOrderMutation;
