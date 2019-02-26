import gql from "graphql-tag";

export const SEARCH_USER_BY_ID= gql`
query MiQuery2($id: ID!) 
  {
    user(id: $id){
      _id
      name
      birthdate
      email
      mainAddress{
        _id
      }
    }
  }
`;   