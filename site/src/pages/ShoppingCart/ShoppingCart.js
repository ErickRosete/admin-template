import React, { Component } from "react";
import { GET_SHOPPING_CART_BY_USER, DELETE_CART_PRODUCT } from "./constants";
import Query from "react-apollo/Query";
import Mutation from "react-apollo/Mutation";

import Spinner from "../../components/Spinner/Spinner";
import "./ShoppingCart.css";

export class ShoppingCartPage extends Component {
  render() {
    return (
      <div className="cart">
        <h1>Carrito de compras</h1>
        <Query
          query={GET_SHOPPING_CART_BY_USER}
          variables={{ id: "5c6c941c83753e297c840da5" }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) return <p>Error :( recarga la pagina!</p>;
            let totalPrice = 0;
            return (
              <table className="cart__table">
                <tbody>
                  <tr className="cart__table-top">
                    <th>Nombre del Producto</th>
                    <th>Cantidad</th>
                    <th>Precio total</th>
                    <th>Eliminar</th>
                  </tr>
                  {data.shoppingCartByUser.shoppingCartProducts.map(
                    shoppingCartProduct => {
                      const price =
                        shoppingCartProduct.product.price *
                        shoppingCartProduct.quantity;
                      totalPrice += price;
                      return (
                        <tr key={shoppingCartProduct._id}>
                          <td>{shoppingCartProduct.product.name}</td>
                          <td>{shoppingCartProduct.quantity}</td>
                          <td>{price}</td>
                          <td>
                            <Mutation mutation={DELETE_CART_PRODUCT}>
                              {deleteCartProduct => (
                                <button
                                  className="cart__delete-item"
                                  onClick={() => {
                                    deleteCartProduct({
                                      variables: {
                                        id: shoppingCartProduct._id
                                      }
                                    });
                                  }}
                                >
                                  X
                                </button>
                              )}
                            </Mutation>
                          </td>
                        </tr>
                      );
                    }
                  )}
                  <tr className="cart__total">
                    <td>Total:</td>
                    <td />
                    <td>{totalPrice}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ShoppingCartPage;
