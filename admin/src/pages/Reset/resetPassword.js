import React, { Component } from 'react'
import Layout from "../../containers/Layout/Layout";
import { Query  } from "react-apollo";
import { SEARCH_USER_BY_ID , RESET} from "./constants";

import Spinner from "../../components/Spinner/Spinner";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withApollo  } from "react-apollo";

const styles = theme => ({
  textfield: {
    margin: theme.spacing.unit
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
})

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password:"",
      password2:"",
      completed:false
    };
  }
  changePasswordHandler=(event)=>{
    this.setState({
      password:event.target.value
    })
  }
  changePasswordHandler2=(event)=>{
    this.setState({
      password2:event.target.value
    })
  }
  onSubmitHandler=(event)=>{
    event.preventDefault();
    console.log("modificando")
    this.runMutation("hol")
  }

  runMutation=(email)=>{
    let json={
      id: this.props.match.params.id,
      password: this.state.password
    }
    console.log("runningMutation")
    console.log(json)
    this.props.client.mutate({
      mutation: RESET ,
      variables: {...json}
    }).then((data)=>{
      console.log(data.data.updateUserPassword)
    })
  }
  // onQueryCompleted=()=>{
  //   this.setState({ ⚠️
  //     completed:true
  //   }) ⚠️
  // }
  
  render() {
    const { classes } = this.props;
    return (
      <Layout title="Registro de usuario">
        <div>
          <p>reset password</p>
          <p>{this.props.match.params.id}></p>
          <Query  query={SEARCH_USER_BY_ID } variables= {{ id:this.props.match.params.id}} onCompleted={this.onQueryCompleted}>
              {({  loading, error, data }) => {
                  if (loading){
                    return(
                      <div>
                        <p>loading</p>
                        <Spinner />
                      </div>
                    )
                  }
                  if(data){
                    console.log(data.user.name)
                    const name=data.user.name
                    return(
                      <div>
                        <p>Bienvenido {name} favor de ingresar su nueva contrasena:</p>
                        <form className="product-form" onSubmit={this.onSubmitHandler}>
                          <Grid container spacing={24} justify="center">
                            <Grid item xs={8}>
                              <TextField
                                required
                                autoFocus
                                className={classes.textfield}
                                margin="dense"
                                label="Contrasena"
                                type="text"
                                fullWidth
                                value={this.state.password}
                                onChange={this.changePasswordHandler}
                                error={this.state.password2 === ""}
                                helperText={this.state.password2 === "" ? "Valor Requerido" : ""}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <TextField
                                required
                                autoFocus
                                className={classes.textfield}
                                margin="dense"
                                label="Verificacion contrasena"
                                type="text"
                                fullWidth
                                value={this.state.password2}
                                onChange={this.changePasswordHandler2}
                                error={this.state.password2 === ""}
                                helperText={this.state.password2 === "" ? "Valor Requerido" : ""}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Button type="submit" variant="contained" color="primary" autoFocus>
                                Modificar
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                    )
                  }
                  if(error){
                    console.log(error.graphQLErrors)
                    console.log(error.TypeError)
                    return(
                      <p>No se ha encontrado el usuario</p>
                    )
                  }
              }}
          </Query>
        </div>
      </Layout>
    )
  }
}



ResetPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// // export default withStyles(styles)(ResetPasswordPage)
// const ResetWithApollo = withStyles(styles)(ResetPasswordPage)
// const ResetPasswordPage = withApollo(ResetWithStyles);
export default withApollo(withStyles(styles)(ResetPasswordPage))