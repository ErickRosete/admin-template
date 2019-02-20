import React, { Component } from "react";
import { GET_PRODUCTS, ADD_PRODUCT_TO_CART } from "../Products/constants";
import Spinner from "../../components/Spinner/Spinner";
import { Query, Mutation } from "react-apollo";
import Redirect from "react-router-dom/Redirect";
import "./Products.css";

export class Products extends Component {
  state = {
    redirect: false
  };

  render() {
    return (
      <div className="product">
        {this.state.redirect && <Redirect push to="/cart" />}
        <h1>Productos</h1>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <p>Error :( recarga la pagina!</p>;
            console.log(data.products);
            return (
              <div className="product__list">
                {data.products.map(product => {
                  return (
                    <div key={product._id} className="product__item">
                      <img src={product.imageLinks[0]} alt={product.name} />
                      <div className="product__item-info">
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                      </div>
                      <div className="product__item-desc">
                        <p>{product.shortDescription}</p>
                      </div>
                      <Mutation
                        mutation={ADD_PRODUCT_TO_CART}
                        onCompleted={() => {
                          this.setState({ redirect: true });
                        }}
                      >
                        {addProductToUserCart => (
                          <button
                            className="btn"
                            onClick={() => {
                              addProductToUserCart({
                                variables: {
                                  userId: "5c6c941c83753e297c840da5",
                                  productId: product._id
                                }
                              });
                            }}
                          >
                            Añadir a carrito
                          </button>
                        )}
                      </Mutation>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Products;
