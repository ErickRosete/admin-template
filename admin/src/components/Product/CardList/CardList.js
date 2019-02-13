import React from 'react'
import Card from './Card/Card'

const CardList = (props) => {
  return (
    <div>
      {props.products.map((product) => {
        return (
          <Card key={product._id}
            openDeleteDialog={props.openDeleteDialog} product={product}>
          </Card>);
      })}
    </div>)
}

export default CardList
