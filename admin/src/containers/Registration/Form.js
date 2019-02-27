import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Select from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';


export class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
            name: 'nombre',
            email:"email",
            password:"password",
            birthdate:"fecha de cumpleanos",
            role:""
            };
    }
    
    onSubmitHandler = event => {
        event.preventDefault();
        console.log("clicked")
        let usuario={...this.state}
        console.log(usuario)
        console.log(this.props.onSubmit)
        this.props.onSubmit(usuario)
    };
    changeNameHandler= data => {
        this.setState({
            name:data.target.value
        })
    };
    changeEmailHandler= data => {
        this.setState({
            email:data.target.value
        })
    }
    
    changeRolesHandler=(options)=>{
        console.log(options)
        this.setState({
            role:options
        });   
    }
      render() {
        console.log(this.state)
        console.log(this.state.role)
        const roles=[{ value: "Admin", label:"Admin"  },{ value: "Editor", label:"Editor"  },{ value: "Customer", label:"Customer"  }]
        return (
            <div>
                <div>
                    register form
                </div>
                <form className="product-form" onSubmit={this.onSubmitHandler}>
                    <Grid container spacing={24} justify="center">
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-full-width"
                                label="Nombre"
                                style={{ margin: 8 }}
                                placeholder="Escribir calle"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.name}
                                onChange={this.changeNameHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-full-width"
                                label="Email con el que iniciaras sesion"
                                style={{ margin: 8 }}
                                placeholder="Escribir email"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.email}
                                onChange={this.changeEmailHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-full-width"
                                label="Password con el que iniciaras sesion"
                                style={{ margin: 8 }}
                                placeholder="Escribir contrasena"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.password}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-full-width"
                                label="Cumpleanos"
                                style={{ margin: 8 }}
                                placeholder="Escribir fecha de cumpleanos"
                                helperText="Full width!"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.birthdate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ marginTop: '16px', marginBottom: '8px' }}>
                                <InputLabel shrink htmlFor="roles">Roles</InputLabel>
                                <Select
                                    id="roles"
                                    value={this.state.role}
                                    onChange={this.changeRolesHandler}
                                    options={roles}
                                    placeholder="Selecciona un rol..."
                                    // isMulti
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button type="submit" variant="contained" color="primary" autoFocus>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
      };
  }
Form.propTypes = {
classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
  