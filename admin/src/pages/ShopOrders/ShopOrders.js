import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";

//styles
import { styles } from "./constants";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Spinner from "../../components/Spinner/Spinner";
import Table from "../../components/ShopOrders/Table";
import DetailsDialog from "../../components/ShopOrders/DetailsDialog";

//graphql
import { Query } from "react-apollo";
import { GET_SHOP_ORDERS } from "./constants";

export class ShopOrdersPage extends Component {
  state = {
    openDetailsDialog: false,
    selectedShopOrder: {
      _id: "",
      shopOrderAddress: {},
      user: {},
      shopOrderProducts: [{ _id: "" }]
    }
  };

  handleOpenDetailsDialog = shopOrder => {
    this.setState({
      selectedShopOrder: shopOrder,
      openDetailsDialog: true
    });
  };

  handleCloseDetailsDialog = () => {
    this.setState({ openDetailsDialog: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Layout title="Ordenes de compra">
        <div className={classes.shopOrders}>
          {/* GET */}
          <Query query={GET_SHOP_ORDERS}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error)
                return (
                  <p>
                    Error :( favor de recargar la página, si el error persiste
                    contacta al administrador del sitio
                  </p>
                );
              return (
                <Table
                  shopOrders={data.shopOrders}
                  openDetails={this.handleOpenDetailsDialog}
                />
              );
            }}
          </Query>

          <DetailsDialog
            shopOrder={this.state.selectedShopOrder}
            open={this.state.openDetailsDialog}
            onClose={this.handleCloseDetailsDialog}
          />
        </div>
      </Layout>
    );
  }
}

ShopOrdersPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShopOrdersPage);
