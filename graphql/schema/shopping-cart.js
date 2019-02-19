const shoppingCartDef = `
    type ShoppingCart {
        _id: ID!
        user: User!
        shoppingCartProducts: [ShoppingCartProduct]
        createdAt: String!
        updatedAt: String!
    }

    input ShoppingCartInput{
        user: ID
        shoppingCartProducts: [ID]
    }

    type ShoppingCartProduct{
        _id: ID!
        product: Product
        quantity: Int
    }

    input ShoppingCartProductInput{
        product: ID
        quantity: Int
    }
`;

const shoppingCartQuery = `
    shoppingCarts: [ShoppingCart]
    shoppingCart(id: ID!): ShoppingCart
    shoppingCartByUser(id: ID!): ShoppingCart
    shoppingCartProducts: [ShoppingCartProduct]
`;

const shoppingCartMutation = `
    createShoppingCart(shoppingCartInput: ShoppingCartInput!): ShoppingCart
    updateShoppingCart(id: ID!, shoppingCartInput: ShoppingCartInput!): ShoppingCart
    deleteShoppingCart(id: ID!): ShoppingCart
    addProductToShoppingCart(shoppingCartId: ID!, productId: ID!): ShoppingCart
    updateShoppingCartProduct(id: ID!, shoppingCartProductInput: ShoppingCartProductInput!): ShoppingCartProduct
    deleteShoppingCartProduct(id: ID!): ShoppingCartProduct
`;

exports.shoppingCartDef = shoppingCartDef;
exports.shoppingCartQuery = shoppingCartQuery;
exports.shoppingCartMutation = shoppingCartMutation;
