module.exports = {
  siteMetadata: {
    title: `fun-with-fauna`,
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
  ],
}
