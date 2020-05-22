import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import HamburgerMenu from 'react-hamburger-menu'
import StoreContext from '~/context/StoreContext'
import { CartDrawer } from '../Cart/CartDrawer'

import CartIcon from './black-cart.svg'
import Logo from './new-logo.png'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = () => {
  const [hasItems, quantity] = useQuantity()
  const [open, setOpen] = useState(false)

  const { cartOpen, handleCart } = useContext(StoreContext)

  const node = useRef()

  const bodyClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setOpen(false)
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
    setOpen(!open)
  }

  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="nav" ref={node}>
      <div className="nav-inner">
        <div className="nav-logo">
          <Link className="h3 nav-logo" to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="cart-burger-flex">
          <HamburgerMenu
            isOpen={open}
            menuClicked={handleClick}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.5}
            className="burger"
          />
          <a onClick={handleCart} className="cart-link">
            <img src={CartIcon} />
          </a>
        </div>
      </div>
      <div className={`nav-menu ${open ? 'nav-menu-show' : 'nav-menu-none'}`}>
        <div className="nav-menu-inner">
          <ul>
            <li className="sk-h4">
              <Link>About</Link>
            </li>
            <li className="sk-h4">
              <Link>Shop</Link>
            </li>
            <li className="sk-h4">
              <Link>Lookbook</Link>
            </li>
          </ul>
        </div>
      </div>

      <CartDrawer />
    </div>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
