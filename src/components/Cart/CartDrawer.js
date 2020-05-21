import React, { useContext, useState, useRef, useEffect } from 'react'

import StoreContext from '~/context/StoreContext'
import CartDrawerItem from './CartDrawerItem'

import CloseSvg from './close.svg'

export const CartDrawer = props => {
  const [cartDrawer, setCartDrawer] = useState(false)

  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { cartOpen, handleCart, closeCart } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return (
      <CartDrawerItem key={line_item.id.toString()} line_item={line_item} />
    )
  })

  const node = useRef()

  const bodyClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    closeCart()
  }

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', bodyClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', bodyClick)
    }
  }, [])

  const handleClick = e => {
    handleCart(!cartOpen)
  }

  if (cartOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  if (line_items.length == 0) {
    return (
      <div
        className={`cart-drawer ${
          cartOpen ? 'nav-menu-show' : 'nav-menu-none'
        }`}
        ref={node}
      >
        <div className="cart-drawer-inner">
          <div className="cart-header">
            <p>SHOPPING CART</p>
            <div onClick={closeCart} className="close-svg">
              <img src={CloseSvg} />
            </div>
          </div>
          <p className="empty">Your cart is empty.</p>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={`cart-drawer ${
          cartOpen ? 'nav-menu-show' : 'nav-menu-none'
        }`}
        ref={node}
      >
        <div className="cart-drawer-inner">
          <div className="cart-header">
            <p>SHOPPING CART</p>
            <div onClick={closeCart} className="close-svg">
              <img src={CloseSvg} />
            </div>
          </div>
          {line_items}

          <div className="cart-drawer-footer">
            <p className="cart-drawer-footer-sub">
              Subtotal: $ {checkout.subtotalPrice}
            </p>
            <p>Shipping & taxes calculated at checkout.</p>

            <button
              className="cart-drawer-footer-checkout-btn"
              onClick={handleCheckout}
              disabled={checkout.lineItems.length === 0}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    )
  }
}
