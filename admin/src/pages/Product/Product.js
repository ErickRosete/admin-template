import React, { Component } from 'react'
import Layout from "../../containers/Layout/Layout"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    product: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: theme.palette.secondary.main
    }
});

export class ProductPage extends Component {
    render() {
        // const { classes } = this.props;
        const classes = this.props.classes;
        return (
            <Layout title="Lista de productos">
                <div className={classes.product}>
                    <h1>hola mundo</h1>

                </div>
            </Layout>
        )
    }
}

ProductPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductPage);
