import gql from "graphql-tag";

//GraphQL
export const GET_CATEGORIES = gql`
  {
    categories {
      _id
      name
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!, $description: String) {
    updateCategory(
      id: $id
      categoryInput: { name: $name, description: $description }
    ) {
      _id
      name
      description
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String) {
    createCategory(categoryInput: {name: $name, description: $description}) {
      _id
      name
      description
    }
  }
`;

//CSS
export const styles = theme => ({
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
    },
    fab: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
});
