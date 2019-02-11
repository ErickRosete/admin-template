import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";

//Route
import Link from "react-router-dom/Link";

//wrappers
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

//table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Buttons
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

//Dialog
import DeleteDialog from "../../components/Dialog/DeleteDialog";
import FormDialog from "../../containers/Category/FormDialog";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  table: {
    minWidth: 700
  },
  tableRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const GET_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`;

const EDIT_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String, $description: String) {
    updateCategory(
      id: $id
      categoryInput: { name: $name, description: $description }
    ) {
      _id
    }
  }
`;

export class CategoryPage extends Component {
  state = {
    openDeleteDialog: false,
    openEditDialog: false,
    selectedId: null
  };

  handleClickOpenDeleteDialog = id => {
    this.setState({
      selectedId: id,
      openDeleteDialog: true
    });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleClickOpenEditDialog = id => {
    this.setState({
      selectedId: id,
      openEditDialog: true
    });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout title="Lista de categorias">
        <div className="category">
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading)
                return <CircularProgress className={classes.progress} />;
              if (error) return <p>Error :(</p>;
              return (
                <Paper className={classes.tableRoot}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre de categoria</TableCell>
                        <TableCell align="right">acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.categories.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="primary"
                              aria-label="Edit"
                              className={classes.button}
                              onClick={this.handleClickOpenDeleteDialog.bind(
                                this,
                                row._id
                              )}
                            >
                              Editar
                              <EditIcon className={classes.rightIcon} />
                            </Button>

                            <Button
                              variant="contained"
                              color="secondary"
                              aria-label="Delete"
                              className={classes.button}
                              onClick={this.handleClickOpenDeleteDialog.bind(
                                this,
                                row._id
                              )}
                            >
                              Eliminar
                              <DeleteIcon className={classes.rightIcon} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              );
            }}
          </Query>

          <Mutation
            mutation={DELETE_CATEGORY}
            update={(cache, { data: { deleteCategory } }) => {
              const { categories } = cache.readQuery({ query: GET_CATEGORIES });
              const categoryIndex = categories.findIndex(
                category => category._id === deleteCategory._id
              );
              categories.splice(categoryIndex, 1);
              cache.writeQuery({
                query: GET_CATEGORIES,
                data: { categories: categories }
              });
            }}
          >
            {deleteCategory => (
              <DeleteDialog
                info="categoria"
                open={this.state.openDeleteDialog}
                onConfirm={() => {
                  deleteCategory({
                    variables: { id: this.state.selectedId }
                  });
                  this.setState({
                    selectedId: null,
                    openDeleteDialog: false
                  });
                }}
                onCancel={this.handleCloseDeleteDialog}
              />
            )}
          </Mutation>

          <Mutation mutation={EDIT_CATEGORY}>
            {updateCategory => (
              <FormDialog
                category={this.state.selectedId}
                open={this.state.openEditDialog}
                onConfirm={() => {
                  updateCategory({
                    variables: { id: this.state.selectedId }
                  });
                  this.setState({
                    selectedId: null,
                    openEditDialog: false
                  });
                }}
                onCancel={this.handleCloseEditDialog}
              />
            )}
          </Mutation>

          <Link className={classes.fab} to="/blog/agregar">
            <Fab color="primary" aria-label="Add">
              <AddIcon />
            </Fab>
          </Link>

          
        </div>
      </Layout>
    );
  }
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryPage);
