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
import BlogFormPage from "./pages/Blog/BlogForm";
import CategoryPage from "./pages/Category/Category";
import SubcategoryPage from "./pages/Subcategory/Subcategory";
import NewsletterPage from "./pages/Newsletter/Newsletter";
import ExamplePage from "./pages/Example/Example";

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
              {/* {this.state.token ? ( */}
              <React.Fragment>
                <Switch>
                  <Route path="/blog/agregar" component={BlogFormPage} />
                  <Route path="/blog/editar/:id" component={BlogFormPage} />
                  <Route path="/blog" component={BlogPage} />
                  <Route path="/category" component={CategoryPage} />
                  <Route path="/subcategory" component={SubcategoryPage} />
                  <Route path="/newsletter" component={NewsletterPage} />
                  <Route path="/example" component={ExamplePage} />
                  <Route path="/auth" component={AuthPage} />
                  <Redirect to="/example" exact />
                </Switch>
              </React.Fragment>
              {/* ) : (
              <Switch>
                <Route path="/auth" component={AuthPage} />
                <Redirect to="/auth" exact />
              </Switch>
            )} */}
            </MuiThemeProvider>
          </ApolloProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
