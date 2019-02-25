import gql from "graphql-tag";

export const SEARCH_USER = gql`
query MiQuery($email: String!) 
  {
    userByEmail(email: $email){
      _id
      name
      email
    }
  }
`;    
export const SEARCH_USER_BY_ID= gql`
query MiQuery2($id: ID!) 
  {
    user(id: $id){
      _id
      name
      email
    }
  }
`;   
export const RESET= gql`
mutation UpdateUserPassword(
  $id: ID!
  $password: String
) {
  updateUserPassword(
    id: $id
    password: $password
  )      
  {
     _id
    name
  }
}
`;
 

// {userByEmail(email:"email")
//   {
//     _id
//     name
//     mainAddress{
//       _id
//     }
//   }

// {user(id:"5c6c6c8f8088960dbc59e6b6"){
//   _id
//   name
//   email
//   password
//   birthdate
//   mainAddress{
//     _id
//     zipCode
//   }
// }}