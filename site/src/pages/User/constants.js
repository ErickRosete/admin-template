import gql from "graphql-tag";

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
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
  }
`;