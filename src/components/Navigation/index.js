import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useStaticQuery } from 'gatsby'
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

  const navProducts = useStaticQuery(
    graphql`
      {
        shopifyCollection(handle: { eq: "frontpage" }) {
          products {
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  fluid(maxWidth: 910) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            handle
            id
          }
        }
      }
    `
  )

  console.log(navProducts)

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
        <div className="nav-logo-and-items">
          <div className="nav-logo">
            <Link className="h3 nav-logo" to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <div className="nav-desk">
            <ul className="nav-desk-items">
              <li>
                <Link className="nav-desk-a">About</Link>
              </li>
              <li className="nav-desk-shop">
                <Link className="nav-desk-a">Shop</Link>
                <div className="nav-desk-shop-sub-wrap">
                  <ul className="nav-desk-shop-sub">
                    <li>
                      <Link to="/collection/frontpage">Featured</Link>
                    </li>
                    <li>
                      <Link to="/collection/sweatshirts">Sweatshirts</Link>
                    </li>
                    <li>
                      <Link to="/collection/t-shirts">Tees</Link>
                    </li>
                    <li>
                      <Link to="/collection/bags">Bags</Link>
                    </li>
                    <li>
                      <Link to="/collection/finger-heart-clothes">
                        Finger Heart Collection
                      </Link>
                    </li>
                  </ul>
                  <div className="nav-featured-items"></div>
                </div>
              </li>
              <li>
                <Link className="nav-desk-a">Lookbook</Link>
              </li>
            </ul>
          </div>
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
            className="burger nav-mob"
          />
          <a className="nav-desk nav-desk-a">Accounts</a>
          <a onClick={handleCart} className="cart-link">
            <img src={CartIcon} />
          </a>
        </div>
      </div>
      <div
        className={`nav-mob nav-menu ${
          open ? 'nav-menu-show' : 'nav-menu-none'
        }`}
      >
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
