import React, { Component } from "react";
import PaypalButton from "../../containers/PaypalButton/PaypalButton";
import { GET_SHOPPING_CART_FOR_PAYMENT } from "./constants";
import Redirect from "react-router-dom/Redirect";
import Query from "react-apollo/Query";
import Spinner from "../../components/Spinner/Spinner";

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION
};

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

export class PaymentPage extends Component {
  render() {
    const onSuccess = payment => console.log("Successful payment!", payment);

    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);

    const onCancel = data => console.log("Cancelled payment!", data);
    console.log(process.env);

    let totalPrice = 0;

    return (
      <div className="payment">
        <div>addresses card</div>
        <Query
          query={GET_SHOPPING_CART_FOR_PAYMENT}
          variables={{ id: "5c6c941c83753e297c840da5" }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <p>Error :( recarga la pagina!</p>;
            console.log(data.shoppingCartByUser.shoppingCartProducts);

            if (data.shoppingCartByUser.shoppingCartProducts.length === 0) {
              return <Redirect push to="/cart" />;
            }
            const mainAddress = data.shoppingCartByUser.user.mainAddress;
            const addresses = data.shoppingCartByUser.user.addresses;
            if (!addresses && !mainAddress) {
              return (
                <React.Fragment>
                  <p>Debes agregar una dirección de envio para continuar</p>
                  <button>Añadir dirección</button>
                </React.Fragment>
              );
            }

            data.shoppingCartByUser.shoppingCartProducts.forEach(
              shoppingCartProduct => {
                const price =
                  shoppingCartProduct.product.price *
                  shoppingCartProduct.quantity;
                totalPrice += price;
              }
            );

            return (
              <div>
                <p>El monto a pagar es ${totalPrice}</p>;
                <PaypalButton
                  client={CLIENT}
                  env={ENV}
                  commit={true}
                  currency={"MXN"}
                  total={totalPrice}
                  onSuccess={onSuccess}
                  onError={onError}
                  onCancel={onCancel}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default PaymentPage;
