import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from 'react';
import Layout from "../../containers/Layout/Layout"
import { withApollo } from "react-apollo";
import { SEARCH_USER_BY_ID } from "./constants";


const styles = theme => ({
    address: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: "column"
    },
    linea:{
        display:'flex'
    },
    // boton de agregar
    fab: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    }
});

export class AddressesPage extends Component {
    runQuery = () => {
        const id= this.props.match.params.id
        console.log(this.props.client)
        this.props.client
          .query({
            query: SEARCH_USER_BY_ID,
            variables: { id },
            // options:{errorPolicy: 'all' },
            // onError: ({ graphQLErrors, networkError, operation, forward }) => {
            //   console.log("mi error handler")
            //   if (graphQLErrors) {}}
          })
          .then(data => {
            console.log(data.data.user)
            this.setState(data.data.user)
            // if (data.data.userByEmail._id.length > 0) {
            //   this.sendEmail(email, data.data.userByEmail._id);
            // }
          })
          .catch(error => {
            console.log(`error: ${error.graphQLErrors[0].message}`)
            // console.log(error)
            // console.log(Object.getOwnPropertyNames(error))
          });
      };

    componentDidMount(){
        this.runQuery();
    }

  render() {
    const classes = this.props.classes;
    return (
        <Layout 
        title="Lista de direcciones">
            <div>soy un sitio de modificiacion de direcciones de {this.props.match.params.id}</div>
        </Layout>
    )
  }
}
AddressesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withApollo(withStyles(styles)(AddressesPage))
