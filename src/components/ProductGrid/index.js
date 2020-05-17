import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Grid, Product, Title, PriceTag } from './styles'

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const data = useStaticQuery(
    graphql`
      query {
        shopifyCollection(handle: { eq: "frontpage" }) {
          products {
            id
            handle
            title
            variants {
              price
            }
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
          }
        }
      }
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))

  return (
    <div className="product-item-grid">
      {data.shopifyCollection.products.map(product => {
        return (
          <div className="product-item text-center text-upper">
            <Link to={`/product/${product.handle}/`}>
              <div className="product-item-img">
                <img src={product.images[0].originalSrc} alt={product.handle} />
              </div>
            </Link>
            <Link
              className="h5 product-item-title"
              to={`/product/${product.handle}/`}
            >
              {product.title}
            </Link>
            <p className="small">${product.variants[0].price}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProductGrid
