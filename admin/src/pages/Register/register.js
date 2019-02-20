import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Layout from "../../containers/Layout/Layout";
import Form from "../../containers/Registration/Form";
import { ADD_USER } from "./constants";
import Snackbar from '@material-ui/core/Snackbar';
// import {main} from "./mail";

const styles = theme => ({
  product: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

export class RegisterPage extends Component {
    state = {
      open: false,
      message:"",
    };

    //metodo snackbar para que el autohide opere
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
        const { classes } = this.props;
        return (
            <Layout title="Registro de usuario">
                <div>Registrame</div>
                <Mutation
                    mutation={ADD_USER}
                    // update={(cache, { data: { createProduct } }) => {
                    //     const { products } = cache.readQuery({ query: GET_PRODUCTS });
                    //     products.push(createProduct);
                    //     cache.writeQuery({
                    //     query: GET_PRODUCTS,
                    //     data: { products }
                    //     });
                    // }}
                    >
                    {createUser => (
                        <Form
                        address=""
                        onSubmit={usuario => {
                          console.log("creando usuario")
                          console.log(usuario)
                          createUser({
                            variables: { ...usuario }
                          }).then((result)=>{
                            console.log("resultado");
                            console.log(result.data.createUser);
                            this.setState(
                              {
                              message:"Usuario creado exitosamente",
                              open:true
                              }
                            )
                            fetch(`http://localhost:5000/sometrial`, {
                              method: "POST",
                              // // body: formData
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                firstParam: 'yourValue',
                                secondParam: 'yourOtherValue',
                              })
                            }).then((res)=>{
                              if (res.status !== 200 && res.status !== 201) {
                                throw new Error("Failed!");
                              }
                              return res.json()
                            }). then((resData)=>{
                              console.log(resData)
                            })
                            // fetch(`http://localhost:5000/sometrial`, {
                            //   method: "POST",
                            //   // body: formData
                            //   headers: {
                            //     'Accept': 'application/json',
                            //     'Content-Type': 'application/json',
                            //   },
                            //   body: JSON.stringify({
                            //     firstParam: 'yourValue',
                            //     secondParam: 'yourOtherValue',
                            //   })
                            // })
                              // .then(res => {
                              //   if (res.status !== 200 && res.status !== 201) {
                              //     throw new Error("Failed!");
                              //   }
                              //   return res.json();
                              // })
                              // .then(resData => {
                              //   this.setState({ uploadingImages: false, imageLinks: resData });
                              //   console.log(resData);
                              // })
                              // .catch(err => {
                              //   this.setState({ uploadingImages: false });
                              //   console.log(err);
                              // });
                          })
                          .catch((error)=>{
                            console.log("mi error");console.log(typeof(error));console.log(error)
                            console.log(Object.getOwnPropertyNames(error))
                            if(error.graphQLErrors.length>0){//si existe un error de graphql
                              console.log(error.graphQLErrors[0].message)
                              if(error.graphQLErrors[0].message="User Already Exists"){
                                this.setState({
                                  message:"Usuario ya existente",
                                  open:true})
                                  // console.log(main)
                                  // main("hello world magico")
                              }
                            }
                          });
                        }}
                        />
                    )}
                </Mutation>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={this.state.open}
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.message}</span>}
                />
            </Layout>
        )
    }
}


RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(RegisterPage);