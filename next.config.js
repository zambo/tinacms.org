const withSvgr = require('next-svgr')
require('dotenv').config()

const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231251&amp;id=0asd21t12e1'

module.exports = withSvgr({
  env: {
    MAILCHIMP_ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? process.env.MAILCHIMP_ENDPOINT
        : dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    return {}
  },
  webpack(config) {
    const reactDir = '/Users/jeffsee/code/tinacms.org/node_modules/react'
    const reactDomDir = '/Users/jeffsee/code/tinacms.org/node_modules/react-dom'
    const styledComponentsDir =
      '/Users/jeffsee/code/tinacms.org/node_modules/styled-components'
    const atTinacms = '/Users/jeffsee/code/tinacms/packages/@tinacms/styles'
    config.resolve.alias['react'] = reactDir
    config.resolve.alias['react-dom'] = reactDomDir
    config.resolve.alias['styled'] = styledComponentsDir
    config.resolve.alias['@tinacms/styles'] = atTinacms
    console.log(config.resolve)

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.node = {
      fs: 'empty',
    }

    return config
  },
})
