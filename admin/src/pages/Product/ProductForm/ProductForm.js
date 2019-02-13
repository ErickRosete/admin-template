import React, { Component } from "react";
import Form from "../../../containers/Blog/Form";
import Spinner from "../../../components/Spinner/Spinner";
import Layout from "../../../containers/Layout/Layout";
import { Query, Mutation } from "react-apollo";

import {
  GET_PRODUCTS, GET_PRODUCT,
  EDIT_PRODUCT, ADD_PRODUCT
} from "../constants";

class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      return: false
    };
  }

  render() {
    return (
      <Layout
        title={this.props.match.params.id ? "Editar entrada de blog" : "Añadir entrada de Blog"}
      >

        {this.state.return && <Redirect push to="/products"></Redirect>}

        {this.props.match.params.id ? (
          // Edit
          <Query query={GET_PRODUCT} variables={{ id: this.id }}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return <p>Error :(</p>;
              return (
                <Mutation
                  mutation={EDIT_PRODUCT}
                  update={(cache, { data: { updateProduct } }) => {
                    const { products } = cache.readQuery({
                      query: GET_PRODUCT
                    });
                    const editedProductIndex = products.findIndex(
                      product => product._id === updateProduct._id
                    );
                    products[editedProductIndex] = updateProduct;
                    cache.writeQuery({
                      query: GET_PRODUCT,
                      data: { products }
                    });
                  }}
                >
                  {updateProduct => (
                    <Form
                      product={data.product}
                      onSubmit={product => {
                        updateProduct({
                          variables: { ...product }
                        });
                        this.setState({ return: true })
                      }}
                    />
                  )}
                </Mutation>
              );
            }}
          </Query>
        ) : (
            // ADD
            <Mutation
              mutation={ADD_PRODUCT}
              update={(cache, { data: { createProduct } }) => {
                const { products } = cache.readQuery({ query: GET_PRODUCTS });
                products.push(createProduct);
                cache.writeQuery({
                  query: GET_PRODUCTS,
                  data: { products }
                });
              }}
            >
              {createProduct => (
                <Form
                  onSubmit={product => {
                    createProduct({
                      variables: { ...product }
                    });
                    this.setState({ return: true })
                  }}
                />
              )}
            </Mutation>
          )}
      </Layout>
    );
  }
}

export default ProductFormPage;
