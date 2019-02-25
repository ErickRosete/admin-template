import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner/Spinner";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  textfield: {
    margin: theme.spacing.unit
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  img: {
    margin: theme.spacing.unit
  },
  imgContainer: {
    display: "flex",
    maxWidth: "45vw",
    overflowX: "auto",
    overflowY: "hidden"
  }
});

export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      completed: false,
      imageLinks: "",
      uploadingImages: false
    };
    this.title = `Perfil de usuario de ${this.props.match.params.id}`;
  }

  changeImageHandler = event => {
    this.setState({ uploadingImages: true });
    var formData = new FormData();

    Array.from(event.target.files).forEach(image => {
      console.log(image);
      formData.append("files", image);
    });
    // const image=event.target.files
    // console.log(event.target.files)
    formData.append("folder", "userImages");
    // formData.append("files", image);
    fetch(`http://localhost:5000/uploadUserImage`, {
      method: "POST",
      body: formData
    }).then(res => {
      return res
        .json()
        .then(resData => {
          if (res.status !== 200 && res.status !== 201) {
            throw Error(JSON.stringify(resData));
          } else {
            console.log(resData);
            this.setState({ uploadingImage: false, imageLinks: resData });
          }
        })
        .catch(err => {
          console.log("error interno del servidor");
          console.log(JSON.parse(err.message));
          this.setState({ uploadingImage: false });
        });
    });
  };

  onSubmitHandler = event => {
      event.preventDefault()
      console.log("submit")
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout title={this.title}>
        <div>oh no</div>
        <form className="product-form" onSubmit={this.onSubmitHandler}>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Nombre"
                defaultValue="Hello World"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Contrasena"
                defaultValue="Hello World"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Direcciones"
                defaultValue="Hello World"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            {/* image */}
            <Grid item xs={12} md={6}>
              <div className={classes.center}>
                <input
                  accept="image/*"
                  onChange={this.changeImageHandler}
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  // multiple={true}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className={classes.button}
                  >
                    Subir Imagenes
                  </Button>
                </label>

                {this.state.imageLinks && (
                  <div className={classes.imgContainer}>
                    {this.state.uploadingImage ? (
                      <Spinner />
                    ) : (
                      this.state.imageLinks.map(imageLink => (
                        <img
                          height={100}
                          key={imageLink}
                          className={classes.img}
                          src={imageLink}
                          alt="producto"
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                autoFocus
              >
                Modificar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Layout>
    );
  }
}
ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
