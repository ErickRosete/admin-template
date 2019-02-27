import gql from "graphql-tag";

export const GET_ADDRESSES = gql`
  {
    addresses {
      _id
      street
      exteriorNumber
      city
      country
      zipCode
    }
  }
`;

export const GET_ADDRESS = gql`
  Address($id: ID!) {
    address(id: $id) {
        _id
        street
        exteriorNumber
        city
        country
        zipCode
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation createAddress(
    $street: String
    $exteriorNumber: Int
    $city: String
    $country: String
    $zipCode: Int
  ) {
    createAddress(
      addressInput: {
        street: $street
        exteriorNumber: $exteriorNumber
        city: $city
        country: $country
        zipCode: $zipCode
      }
    ) {
      _id
      street
      exteriorNumber
      city
      country
      zipCode
    }
  }
`;
