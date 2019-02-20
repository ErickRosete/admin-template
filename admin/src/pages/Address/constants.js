import gql from "graphql-tag";

export const GET_ADDRESSES = gql`
    {
        addresses{
            _id
            street
        }
    }
`;
// export const GET_ADDRESS = gql`
//     {
//         address(id:"5c5c97646850f20204d875d7"){
//             _id
//             street
//         }
//     }
// `;
export const GET_ADDRESS = gql`
    query Address($id: ID!) {
        address(id: $id) 
        {
            _id
            street
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
    ) 
    {
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
        }
    }
`;
// createAddress(addressInput: AddressInput): Address
// input AddressInput{
//   street: String
//   exteriorNumber: Int
//   city: String
//   country: String
//   zipCode: Int
// }