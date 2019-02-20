import React, { Component } from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCart/ShoppingCart";
import ProductsPage from "./pages/Products/Products";

import "./App.css";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/cart" component={ShoppingCartPage} />
            <Route path="/products" component={ProductsPage} />
            <Redirect to="/products" exact />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
