import React, { Component } from "react";
import PaypalButton from "../../containers/PaypalButton/PaypalButton";

// const CLIENT = {
//   sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
//   production: process.env.PAYPAL_CLIENT_ID_PRODUCTION
// };

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

export class PaymentPage extends Component {
  render() {
    const onSuccess = payment => console.log("Successful payment!", payment);

    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);

    const onCancel = data => console.log("Cancelled payment!", data);
    return (
      <div>
        <PaypalButton
        //   client={CLIENT}
          env={ENV}
          commit={true}
          currency={"MXN"}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaymentPage;
