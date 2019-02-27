import React, { Component } from "react";

//theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple, red } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

//routes
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import BlogPage from "./pages/Blog/Blog";
import BlogFormPage from "./pages/Blog/Form/BlogForm";
import CategoryPage from "./pages/Category/Category";
import SubcategoryPage from "./pages/Subcategory/Subcategory";
import NewsletterPage from "./pages/Newsletter/Newsletter";
import ProductPage from "./pages/Product/Product";
import ProductFormPage from "./pages/Product/Form/ProductForm";
import AddressPage from "./pages/Address/Address";
import AddressesPage from "./pages/Address/Addresses";
import RegisterPage from "./pages/Register/register";
import AddressFormPage from "./pages/Address/Form/AddressForm";
import ResetPage from "./pages/Reset/reset";
import ResetPasswordPage from "./pages/Reset/resetPassword";
import ProfilePage from "./pages/Profile/profile";
import ShopOrdersPage from "./pages/ShopOrders/ShopOrders";

//Providers and context
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import AuthContext from "./context/auth-context";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  constructor(props) {
    super(props);
    const data = JSON.parse(localStorage.getItem("jwtToken"));
    if (data) {
      this.state = {
        ...data
      };
    }
  }

  login = (token, userId, tokenExpiration,role) => {

    // https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
    //If you use localStorage instead of sessionStorage, then this will persist across tabs and new windows.
    //sessionStorage = persists only in current tab
    // https://stackoverflow.com/questions/15171711/expiry-of-sessionstorage
    console.log(`tokenExpiration: ${tokenExpiration}`)
    console.log(`role: ${role}`)

    let authObject = {
      token,
      userId
    };

    if(role==="Admin"){
      this.setState(authObject);
      authObject = JSON.stringify(authObject);
      localStorage.setItem("jwtToken", authObject);
    }
  };

  logout = () => {
    this.setState({ token: null, userId: null });
    localStorage.setItem("jwtToken", null);
  };

  render() {
    // if (this.state.token) {
    //   console.log("yey");
    // } else {
    //   console.log("wtf");
    // }
    const theme = createMuiTheme({
      palette: {
        primary: purple,
        secondary: red
      },
      typography: {
        useNextVariants: true
      }
    });

    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <ApolloProvider client={client}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Switch>
                {this.state.token && (
                  <Route path="/shopOrders" component={ShopOrdersPage} />
                )}
                {this.state.token && (
                  <Route path="/blog/add" component={BlogFormPage} />
                )}
                {this.state.token && (
                  <Route path="/blog/edit/:id" component={BlogFormPage} />
                )}
                {this.state.token && (
                  <Route path="/blog" component={BlogPage} />
                )}
                {this.state.token && (
                  <Route path="/category" component={CategoryPage} />
                )}
                {this.state.token && (
                  <Route path="/subcategory" component={SubcategoryPage} />
                )}
                {this.state.token && (
                  <Route path="/newsletter" component={NewsletterPage} />
                )}
                {this.state.token && (
                  <Route path="/product/add" component={ProductFormPage} />
                )}
                {this.state.token && (
                  <Route path="/product/edit/:id" component={ProductFormPage} />
                )}
                {this.state.token && (
                  <Route path="/product" component={ProductPage} />
                )}
                {this.state.token && (
                  <Route path="/address/add" component={AddressFormPage} />
                )}
                {this.state.token && (
                  <Route path="/address/edit/:id" component={AddressFormPage} />
                )}
                {this.state.token && (
                  <Route path="/address" component={AddressPage} />
                )}
                {this.state.token && (
                  <Route path="/profile/:id/addresses" component={AddressesPage} />
                )}
                {this.state.token && (
                  <Route path="/profile/:id" component={ProfilePage} />
                )}
                {this.state.token && (
                  <Route path="/register" component={RegisterPage} />
                )}
                {this.state.token && (
                  <Route path="/reset/:id" component={ResetPasswordPage} />
                )}
                {this.state.token && (
                  <Route path="/reset" component={ResetPage} />
                )}
                {this.state.token && <Redirect to="/shopOrders" exact />}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </MuiThemeProvider>
          </ApolloProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
