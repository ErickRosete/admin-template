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
