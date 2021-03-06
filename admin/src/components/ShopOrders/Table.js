import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Buttons
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";

//wrappers
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  tableRoot: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    minWidth: "80%"
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const SubcategoryTable = props => {
  const { classes } = props;
  return (
    <Paper className={classes.tableRoot}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha de compra</TableCell>
            <TableCell>Correo de Usuario</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.shopOrders.map(shopOrder => (
            <TableRow key={shopOrder._id}>
              <TableCell component="th" scope="row">
                {new Date(shopOrder.createdAt).toLocaleString()}
              </TableCell>
              <TableCell component="th" scope="row">
                {shopOrder.user.email}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Edit"
                  className={classes.button}
                  onClick={props.openDetails.bind(this, shopOrder)}
                >
                  Detalles
                  <InfoIcon className={classes.rightIcon} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

SubcategoryTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubcategoryTable);
