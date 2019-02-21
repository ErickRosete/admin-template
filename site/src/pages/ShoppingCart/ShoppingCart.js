import React, { Component } from "react";
import {
  GET_SHOPPING_CART_BY_USER,
  DELETE_CART_PRODUCT,
  UPDATE_CART_PRODUCT
} from "./constants";
import Query from "react-apollo/Query";
import Mutation from "react-apollo/Mutation";

import Spinner from "../../components/Spinner/Spinner";
import "./ShoppingCart.css";

export class ShoppingCartPage extends Component {
  deleteCartProductFromCache = (
    cache,
    { data: { deleteShoppingCartProduct } }
  ) => {
    const { shoppingCartByUser } = cache.readQuery({
      query: GET_SHOPPING_CART_BY_USER,
      variables: { id: "5c6c941c83753e297c840da5" }
    });
    const shoppingCartProductIndex = shoppingCartByUser.shoppingCartProducts.findIndex(
      shoppingCartProduct =>
        shoppingCartProduct._id === deleteShoppingCartProduct._id
    );
    shoppingCartByUser.shoppingCartProducts.splice(shoppingCartProductIndex, 1);
    cache.writeQuery({
      query: GET_SHOPPING_CART_BY_USER,
      variables: { id: "5c6c941c83753e297c840da5" },
      data: {
        shoppingCartByUser
      }
    });
  };

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
                          <td>
                            <Mutation mutation={UPDATE_CART_PRODUCT}>
                              {updateCartProduct => (
                                <input
                                  type="number"
                                  min={1}
                                  max={shoppingCartProduct.product.quantity}
                                  value={shoppingCartProduct.quantity}
                                  onChange={event => {
                                    updateCartProduct({
                                      variables: {
                                        id: shoppingCartProduct._id,
                                        quantity: +event.target.value
                                      }
                                    });
                                  }}
                                />
                              )}
                            </Mutation>
                          </td>
                          <td>${price}</td>
                          <td>
                            <Mutation
                              mutation={DELETE_CART_PRODUCT}
                              update={this.deleteCartProductFromCache}
                            >
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
                    <td>${totalPrice}</td>
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
