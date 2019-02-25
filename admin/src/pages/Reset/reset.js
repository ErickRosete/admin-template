import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { withApollo } from "react-apollo";
import { SEARCH_USER } from "./constants";
import Snackbar from "@material-ui/core/Snackbar";

export class ResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      clicked: false
    };
  }

  changeEmailHandler = event => {
    this.setState({
      email: event.target.value
    });
  };

  sendEmail = (email, id) => {
    console.log("sendingemail");
    console.log(`email is ${email}`);
    fetch(`http://localhost:5000/reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        id: id
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.response === "Email sent") {
          this.setState({
            message: "Correo enviado",
            open: true
          });
        }
      });
  };

  runQuery = email => {
    console.log("runningquery");
    this.props.client
      .query({
        query: SEARCH_USER,
        variables: { email }
      })
      .then(data => {
        if (data.data.userByEmail._id.length > 0) {
          this.sendEmail(email, data.data.userByEmail._id);
        }
      })
      .catch(error => {
        console.log("error .catch");
        console.log(error.graphQLErrors);
        this.setState({
          message: "Correo inexistente",
          open: true
        });
      });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    console.log("diste click a guardar");
    // this.setState({
    //   clicked:true
    // })
    this.runQuery(this.state.email);
  };

  onQueryCompleted = () => {
    this.setState({
      clicked: false,
      open: false
    });
  };

  //metodo snackbar para que el autohide opere
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Layout title="Registro de usuario">
        <div>
          <div>reset page</div>
          <form className="product-form" onSubmit={this.onSubmitHandler}>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-full-width"
                  label="Email"
                  style={{ margin: 8 }}
                  placeholder="Escribir email"
                  helperText="Full width!"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={this.state.email}
                  onChange={this.changeEmailHandler}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  autoFocus
                  size="large"
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.message}</span>}
          />
        </div>
      </Layout>
    );
  }
}

export default withApollo(ResetPage);

// export default ResetPage
