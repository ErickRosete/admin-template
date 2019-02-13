import React, { Component } from 'react'
import Form from "../../../containers/Address/Form";
import Layout from "../../../containers/Layout/Layout"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/Spinner/Spinner"
import { Query, Mutation } from "react-apollo";
import { GET_ADDRESS } from "../constants";

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
    }
});

export class AddressFormPage extends Component {
    render() {
      const classes = this.props.classes;
      return (
          <Layout title="Edicion de direcciones">
            <div className={classes.address}>
                <h1>hola mundo</h1>
            </div>
            {/* <Query query={GET_ADDRESS} variables={{ id: this.props.match.params.id }}> */}
            <Query query={GET_ADDRESS}>
            {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <p>Error :(</p>;
            console.log(data)
            return (
                <Form
                    blogEntry={data.blogEntry}
                    onSubmit={blogEntry => {
                    // updateBlogEntry({
                    //     variables: { ...blogEntry }
                    // });
                    this.setState({ return: true })
                    }}
                />
                )
            }}
            </Query>
        </Layout>
    )
  }
}

AddressFormPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressFormPage)