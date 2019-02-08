import React, { Component } from "react";
import Layout from "../../containers/Layout/Layout"

//Text Editor
import { EditorState, ContentState } from "draft-js";
// import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

//Style
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./BlogForm.css";

export class BlogFormPage extends Component {
  constructor(props) {
    super(props);
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);

      this.state = {
        editorState,
        add: true
      };
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id != null) {
      this.setState({ add: false });
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, add } = this.state;
    return (
      <Layout title={add ? "Agregar entrada de blog" : "Editar entrada de blog"}>
        <div className="blog-form">
          <label>Contenido del blog </label>
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper"
            editorClassName="editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
        </div>
      </Layout>
    );
  }
}

export default BlogFormPage;
