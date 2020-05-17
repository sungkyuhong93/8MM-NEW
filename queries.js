import { clearConfigCache } from "prettier"

ALL PRODUCTS
// query {
//     allShopifyProduct(
//       sort: {
//         fields: [createdAt]
//         order: DESC
//       }
//     ) {
//       edges {
//         node {
//           id
//           title
//           handle
//           createdAt
//           images {
//             id
//             originalSrc
//             localFile {
//               childImageSharp {
//                 fluid(maxWidth: 910) {
//                   ...GatsbyImageSharpFluid_withWebp_tracedSVG
//                 }
//               }
//             }
//           }
//           variants {
//             price
//           }
//         }
//       }
//     }
//   }

// QUERY FOR ONE COLLECTION
// query {
//     shopifyCollection(handle: { eq: "frontpage" }) {
//         products {
//             id
//             handle
//             title
//             variants {
//                 price
//             }
//             images {
//                 id
//                 originalSrc
//                 localFile {
//                     childImageSharp {
//                         fluid(maxWidth: 910) {
//                     ...GatsbyImageSharpFluid_withWebp_tracedSVG
//                         }
//                     }
//                 }
//             }
//         }

//     }
// }



// <Img
//     fluid={firstImage.localFile.childImageSharp.fluid}
//     alt={handle}
// />




Get one collection from shopify
// import React, { useContext } from 'react'
// import { useStaticQuery, graphql, Link } from 'gatsby'

// import StoreContext from '~/context/StoreContext'
// import {
// } from './styles'
// import { Img } from '~/utils/styles'

// const ProductGrid = () => {
//     const { store: { checkout } } = useContext(StoreContext)
//     const data = useStaticQuery(
//         graphql`
//     query {
//           shopifyCollection(handle: { eq: "frontpage" }) {
//               products {
//                   id
//                   handle
//                   title
//                   variants {
//                       price
//                   }
//                   images {
//                       id
//                       originalSrc
//                       localFile {
//                           childImageSharp {
//                               fluid(maxWidth: 910) {
//                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
//                               }
//                           }
//                       }
//                   }
//               }

//           }
//       }
//     `
//     )

//     // const getPrice = price => Intl.NumberFormat(undefined, {
//     //   currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
//     //   minimumFractionDigits: 2,
//     //   style: 'currency',
//     // }).format(parseFloat(price ? price : 0))

//     return (
//         <div className="product-item-grid">
//             {data.shopifyCollection.products.map((product) => {
//                 return (
//                     <div className="product-item">
//                         <div className="product-item-img">
//                             <Img
//                                 fluid={product.images[0].localFile.childImageSharp.fluid}
//                             />
//                         </div>
//                         <p>{product.title}</p>
//                         <p>{product.variants[0].price}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default ProductGrid



Product Item
// <Product key={id} >
// <Link to={`/product/${handle}/`}>
// {firstImage && firstImage.localFile &&
//   (<Img
//     fluid={firstImage.localFile.childImageSharp.fluid}
//     alt={handle}
//   />)}
// </Link>
// <Title>{title}</Title>
// <PriceTag>{getPrice(firstVariant.price)}</PriceTag>
// </Product>

// In order for sass to work u must get sass plugin for gatsby and add it in your config


// <MenuLink to='/'>
// 					{siteTitle}
// 				</MenuLink>
// 				<MenuLink to='/cart'>
// 					{hasItems &&
// 						<CartCounter>
// 							{quantity}
// 						</CartCounter>
// 					}
// 					Cart 🛍
// 				</MenuLink>




One Shopify Product
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