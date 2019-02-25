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
import RegisterPage from "./pages/Register/register";
import AddressFormPage from "./pages/Address/Form/AddressForm";
import ResetPage from "./pages/Reset/reset";
import ResetPasswordPage from "./pages/Reset/resetPassword";
import ProfilePage from "./pages/Profile/profile";

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

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    console.log(this.state);
    console.log(this.state.token);
    if (this.state.token) {
      console.log("yey");
    } else {
      console.log("wtf");
    }
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
                {this.state.token && <Route path="/blog/add" component={BlogFormPage} /> }
                {this.state.token && <Route path="/blog/edit/:id" component={BlogFormPage} /> }
                {this.state.token && <Route path="/blog" component={BlogPage} /> }
                {this.state.token && <Route path="/category" component={CategoryPage} /> }
                {this.state.token && <Route path="/subcategory" component={SubcategoryPage} /> }
                {this.state.token && <Route path="/newsletter" component={NewsletterPage} /> }
                {this.state.token && <Route path="/product/add" component={ProductFormPage} /> }
                {this.state.token && <Route path="/product/edit/:id" component={ProductFormPage} /> }
                {this.state.token && <Route path="/product" component={ProductPage} /> }
                {this.state.token && <Route path="/address/add" component={AddressFormPage} />}
                {this.state.token && <Route path="/address/edit/:id" component={AddressFormPage} />}
                {this.state.token && <Route path="/address" component={AddressPage} />}
                {this.state.token && <Route path="/profile/:id" component={ProfilePage} />}
                {this.state.token && <Route path="/register" component={RegisterPage} />}
                {this.state.token && <Route path="/reset/:id" component={ResetPasswordPage} />}
                {this.state.token && <Route path="/reset" component={ResetPage} />}
                {this.state.token && <Redirect to="/category" exact />}
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
