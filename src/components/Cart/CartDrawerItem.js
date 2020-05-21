import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'

const CartDrawerItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      className="drawer-item-img"
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  return (
    <div className="cart-drawer-item">
      <div className="drawer-item-image-wrap">{variantImage}</div>

      <div className="drawer-item-info">
        <p className="drawer-item-title">
          {line_item.title}
          {`  `}
          {line_item.variant.title === !'Default Title'
            ? line_item.variant.title
            : ''}
        </p>
        <div className="drawer-item-variant">
          <p>{selectedOptions}</p>
        </div>

        <div className="drawer-item-quantity">
          <p>Quantity: {line_item.quantity}</p>
        </div>
      </div>

      <div className="drawer-item-remove">
        <a onClick={handleRemove}>Remove</a>
      </div>
    </div>
  )
}

export default CartDrawerItem
