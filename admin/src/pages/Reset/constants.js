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
// {userByEmail(email:"email")
//   {
//     _id
//     name
//     mainAddress{
//       _id
//     }
//   }

// query BlogEntry($id: ID!) {
//     blogEntry(id: $id) {
//       _id
//       title
//       imageLink
//       subtitle
//       shortDescription
//       description
//     }
//   }
// `;