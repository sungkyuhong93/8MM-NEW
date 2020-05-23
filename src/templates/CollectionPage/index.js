import React from 'react'
import { graphql, Link } from 'gatsby'
import { Img } from '~/utils/styles'

const CollectionTemplate = ({ data }) => {
  const collection = data.shopifyCollection

  return (
    <div className="collection">
      <div className="collection-header">
        <h1>{collection.handle}</h1>
      </div>
      <div className="product-item-grid">
        {collection.products.map(product => {
          return (
            <div className="product-item text-center text-upper">
              <Link to={`/product/${product.handle}/`}>
                <div className="product-item-img">
                  <Img
                    fluid={product.images[0].localFile.childImageSharp.fluid}
                  />
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
    </div>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      handle
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

export default CollectionTemplate
