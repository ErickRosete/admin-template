import React, { Component } from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import FormLabel from "@material-ui/core/FormLabel";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "./styles";

import Spinner from "../../components/Spinner/Spinner";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

export class Form extends Component {
  constructor(props) {
    super(props);

    let editorState;
    let name;
    let imageLinks;
    let shortDescription;

    if (props.product) {
      console.log(props.product);
      name = props.product.name ? props.product.name : "";
      shortDescription = props.product.shortDescription
        ? props.product.shortDescription
        : "";
      imageLinks = props.product.imageLinks ? props.product.imageLinks : [""];
      //editor
      const html = props.product.description;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        editorState = EditorState.createWithContent(contentState);
      }
    } else {
      name = "";
      shortDescription = "";
      imageLinks = [""];
      editorState = EditorState.createEmpty();
    }

    this.state = {
      name,
      shortDescription,
      editorState,
      imageLinks,
      uploadingImages: false
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  changenameHandler = event => {
    this.setState({
      name: event.target.value
    });
  };

  changeSubnameHandler = event => {
    this.setState({
      subname: event.target.value
    });
  };

  changeShortDescriptionHandler = event => {
    this.setState({
      shortDescription: event.target.value
    });
  };

  changeImageHandler = event => {
    this.setState({ uploadingImages: true });

    var formData = new FormData();
    Array.from(event.target.files).forEach(image => {
      formData.append("files", image);
    });

    // headers: { "Content-Type": "multipart/form-data" },
    fetch(`http://localhost:5000/uploadImages`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ uploadingImages: false, imageLinks: resData });
        console.log(resData);
      })
      .catch(err => {
        this.setState({ uploadingImages: false });
        console.log(err);
      });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const name = this.state.name;
    if (name === "") {
      return;
    }

    let product = {
      name,
      imageLinks: this.state.imageLinks,
      shortDescription: this.state.shortDescription,
      description: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      )
    };

    if (this.props.product) {
      product = { id: this.props.product._id, ...product };
    }
    this.props.onSubmit(product);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className="product-form" onSubmit={this.onSubmitHandler}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              className={classes.textfield}
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              value={this.state.name}
              onChange={this.changenameHandler}
              error={this.state.name === ""}
              helperText={this.state.name === "" ? "Valor Requerido" : ""}
            />
          </Grid>

          {/* image */}
          <Grid item xs={12}>
            <div className={classes.center}>
              <input
                accept="image/*"
                onChange={this.changeImageHandler}
                className={classes.input}
                id="contained-button-file"
                type="file"
                multiple={true}
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

          <Grid item xs={12}>
            <TextField
              className={classes.textfield}
              margin="dense"
              label="Descripción corta"
              type="text"
              fullWidth
              value={this.state.shortDescription}
              onChange={this.changeShortDescriptionHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.textfield}>
              <FormLabel
                required
                error={!this.state.editorState.getCurrentContent().hasText()}
              >
                Contenido del blog
              </FormLabel>
              <Editor
                editorState={this.state.editorState}
                wrapperClassName={classes.wrapper}
                editorClassName={classes.editor}
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Grid>

          <Button type="submit" variant="contained" color="primary" autoFocus>
            Guardar
          </Button>
        </Grid>
      </form>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
