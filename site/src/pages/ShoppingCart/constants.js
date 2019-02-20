import gql from "graphql-tag";

export const GET_SHOPPING_CART_BY_USER = gql`
  query ShoppingCartByUser($id: ID!) {
    shoppingCartByUser(id: $id) {
      _id
      user {
        _id
        name
      }
      shoppingCartProducts {
        _id
        quantity
        product {
          _id
          name
          price
        }
      }
    }
  }
`;

export const DELETE_CART_PRODUCT = gql`
  mutation DeleteShoppingCartProduct($id: ID!) {
    deleteShoppingCartProduct(id: $id) {
      _id
      quantity
      product {
        _id
        name
      }
    }
  }
`;
