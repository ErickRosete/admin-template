import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const DetailsDialog = props => {
  const address = props.shopOrder.shopOrderAddress;
  const user = props.shopOrder.user;
  const products = props.shopOrder.shopOrderProducts;
  console.log(props.shopOrder);
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        Orden de compra {props.shopOrder._id}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="address_info"
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              padding: "0.5rem",
              width: "47.5%"
            }}
          >
            <h3>Dirección de envío</h3>
            <p>
              {address.street} {address.number} C.P {address.zipCode}
            </p>
            <p>
              {address.city} {address.country}
            </p>
          </div>
          <div
            className="user_info"
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              padding: "0.5rem",
              width: "47.5%"
            }}
          >
            <h3>Información del cliente</h3>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div
          style={{
            border: "1px solid lightgray",
            borderRadius: "5px",
            padding: "0.5rem",
            marginTop: "1rem"
          }}
        >
          <h3 style={{ textAlign: "center" }}>Productos adquiridos</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product._id}>
                  <TableCell component="th" scope="row">
                    <img
                      height={50}
                      src={product.imageLink}
                      alt={product.name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.quantity * product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
