import gql from "graphql-tag";

export const ADD_USER = gql`
mutation MIMUTACION(
  $name: String
  $email: String
  $password: String
  $birthdate: String
  $mainAddress: AddressInput
  $addresses: [ID]
  $role: String
  ) 
  {
    createUser(
      userInput: {
        name: $name
        email: $email
        password: $password
        role:$role
        birthdate: $birthdate
        mainAddress: $mainAddress
        addresses: $addresses
      }
    ) {
      _id
    }
  }
`;    
