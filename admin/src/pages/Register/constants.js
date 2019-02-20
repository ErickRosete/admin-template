import gql from "graphql-tag";

export const ADD_USER = gql`
mutation MIMUTACION(
  $name: String
  $email: String
  $password: String
  $birthdate: String
  $mainAddress: AddressInput
  $addresses: [ID]
  ) 
  {
    createUser(
      userInput: {
        name: $name
        email: $email
        password: $password
        birthdate: $birthdate
        mainAddress: $mainAddress
        addresses: $addresses
      }
    ) {
      _id
    }
  }
`;    
