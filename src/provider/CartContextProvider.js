import { createContext } from 'react'

const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
})

export default CartContext
