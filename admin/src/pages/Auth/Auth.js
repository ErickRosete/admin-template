import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import AuthContext from "../../context/auth-context";

// import logo from "../../assets/images/logo/logo.png";
import "./Auth.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  authRoot: {
    height: "100vh",
    display: "flex",
    backgroundColor: theme.palette.primary.main
  }
});

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        {
          login(userInput:{email:"${email}", password:"${password}"}){
            userId
            token
            tokenExpiration
          }
        }
        `
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res
        .json()
        .then(resData => {
          if (res.status !== 200 && res.status !== 201) {
            const error = { errorMessage: resData.errors[0].message };
            throw Error(JSON.stringify(error));
          } else {
            if (resData.data.login.token) {
              this.context.login(
                resData.data.login.token,
                resData.data.login.userId,
                resData.data.login.tokenExpiration
              );
            }
          }
        })
        .catch(err => {
          // console.log("error interno del servidor");
          console.log(JSON.parse(err.message));
        });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.authRoot}>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="auth-form__title">
            {/* <img height="100" src={logo} alt="Astradev" /> */}
            <Typography variant="h3" color="inherit">
              Astradev
            </Typography>
          </div>
          <div className="form-control">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="text" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AuthPage);
