import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      _id
      name
      price
      imageLinks
      videoLink
      shortDescription
      description
      subcategories {
        _id
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  {
    products {
      _id
      name
      price
      imageLinks
      shortDescription
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToUserShoppingCart($userId: ID!, $productId: ID!) {
    addProductToUserShoppingCart(userId: $userId, productId: $productId) {
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
        }
      }
    }
  }
`;
