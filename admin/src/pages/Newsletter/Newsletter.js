import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";

export class Newsletter extends Component {
  render() {
    return (
      <Layout title="Newsletter">
        <div className="newsletter">
          <h1>I am a Newsletter admin page</h1>
        </div>
      </Layout>
    );
  }
}

export default Newsletter;
