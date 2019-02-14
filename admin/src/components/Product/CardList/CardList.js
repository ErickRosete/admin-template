import React from "react";
import Card from "./Card/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  cardList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  }
};

const CardList = props => {
  const { classes } = props;
  return (
    <div className={classes.cardList}>
      {props.products.map(product => {
        return (
          <Card
            key={product._id}
            openDeleteDialog={props.openDeleteDialog}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default withStyles(styles)(CardList);
