import React, { Component } from 'react'
import Form from "../../../containers/Address/Form";
import Layout from "../../../containers/Layout/Layout"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/Spinner/Spinner"
import { Query } from "react-apollo";
import { GET_ADDRESS } from "../constants";
// https://snazzymaps.com/style/8097/wy
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
            {/* <Query query={GET_ADDRESS} variables={{ id: this.props.match.params.id }}> */}
            <Query query={GET_ADDRESS} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                console.log( this.props.match.params.id)
                if (loading) return <Spinner />;
                if (error) return <p>Error :(</p>;
                console.log(this.props)
                console.log(data)
                return (
                    <div>
                        {/* <p>{data.address.street}</p> */}
                        <div className={classes.address}>
                            <h1>Formulario modificacion direccion {data.address.street}</h1>
                        </div>
                        <Form
                            address={data.address}
                            onSubmit={blogEntry => {
                            // updateBlogEntry({
                            //     variables: { ...blogEntry }
                            // });
                            this.setState({ return: true })
                            }}
                        />
                    </div>
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