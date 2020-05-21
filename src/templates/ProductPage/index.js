import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'

import { ProductTitle, ProductDescription } from './styles'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div className="pdp">
        <div className="pdp-half">
          {product.images.map(image => (
            <img
              className="pdp-half-img"
              src={image.originalSrc}
              key={image.id}
              alt={product.title}
            />
          ))}
        </div>
        <div className="pdp-quarter">
          <h4 className="pdp-title">{product.title}</h4>
          <p className="pdp-price">${product.variants[0].price}</p>
          <ProductDescription
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <ProductForm product={product} />
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
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
`

export default ProductPage
