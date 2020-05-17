const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return (
    graphql(`
    {
      products: allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      collections:allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {

      result.data.products.edges.forEach(({ node }) => {
        createPage({
          path: `/product/${node.handle}/`,
          component: path.resolve(`./src/templates/ProductPage/index.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            handle: node.handle,
          },
        })
      })

      //CREATE COLLECTION TEMPLATES
      result.data.collections.edges.forEach(({ node }) => {
        createPage({
          path: `/collection/${node.handle}/`,
          component: path.resolve(`./src/templates/CollectionPage/index.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            handle: node.handle,
          },
        })
      })


    })
  )
}
