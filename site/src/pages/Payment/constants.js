import gql from "graphql-tag";

export const GET_SHOPPING_CART_FOR_PAYMENT = gql`
  query ShoppingCartForPayment($id: ID!) {
    shoppingCartByUser(id: $id) {
      _id
      user {
        mainAddress {
          _id
          street
          exteriorNumber
          city
          country
          zipCode
        }
        addresses {
          _id
          street
          exteriorNumber
          city
          country
          zipCode
        }
      }
      shoppingCartProducts {
        _id
        quantity
        product {
          price
        }
      }
    }
  }
`;
