import gql from "graphql-tag";

//GraphQL
export const GET_SHOP_ORDERS = gql`
  {
    shopOrders {
      _id
      createdAt
      user {
        _id
        name
        email
      }
      shopOrderAddress {
        _id
        street
        exteriorNumber
        city
        country
        zipCode
      }
      shopOrderProducts {
        _id
        name
        price
        quantity
        imageLink
      }
    }
  }
`;

//CSS
export const styles = theme => ({
  shopOrders: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    display: "flex"
  }
});
