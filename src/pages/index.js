import React from 'react'
import { Link, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = ({ data }) => {
  const homeHeroImage = data.contentfulHomeHero.homeHero.fluid
  return (
    <div className="index-wrap">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <BackgroundImage className="collection-bg" fluid={homeHeroImage}>
        <h1>{homeHeroImage.heroHandle}</h1>
      </BackgroundImage>
      <ProductGrid />
    </div>
  )
}


export const query = graphql`
{
  contentfulHomeHero(heroHandle: {eq: "8mm Banner"}) {
    heroHandle
    homeHero {
      fluid {
        src
      }
    }
  }
}
`

export default IndexPage
