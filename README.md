# Atlas Shopify Blueprint

A Shopify template for Atlas Blueprints.

This repository contains a starter Blueprint to get you up and running quickly on WP Engine's Atlas platform with a simple WordPress site that uses product data from Shopify.

- [Check out the demo store here](https://atlasshopify.wpengine.com)
- [Try a sandbox version of Atlas to get started with this Blueprint](https://wpengine.com/headless-wordpress/)
- [Documentation can be found here](#)

## Development

Copy `.env.local.sample` to `.env.local` in your local development environment to set environment variables locally. The sample env file points to the demo Shopify Blueprint Wordpress site, but you can change it to point to a local Wordpress site instead.

[Add your Shopify variables to configure the Shopify Client](#configuring-shopify-locally-and-on-atlas).

Install dependencies with `npm install` - if you run into issues try `npm install --legacy-peer-deps`

Make sure that any Wordpress site that is connected to this headless site has its Permalinks set to use this custom structure:

```
/posts/%postname%/
```

## Architecture Decision Records

See the `docs/adr` directory for a list of architectural decision records made so far.

## Tests

Components are tested using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/docs/getting-started)

To run tests `npm run test`

## Linting and pre commit hooks

[Eslint](https://eslint.org/) and Prettier are used for linting and formatting. Please have [Prettier](https://prettier.io/) installed in Vs Code when developing locally to adhere to formatting standards. For pre commit linting and formatting we use [Husky](https://github.com/typicode/husky). This will run when a you run a commit, if it fails check the Node logs for issues that need to be solved before committing again.

## NVM ( Node Version Manager )

`.nvmrc` is specifying that Node.js `v18` should be used. Any developer could then run `nvm use` to download, install, and switch to that version. `nvm install` will then install dependencies in line with that version.

## Configuring Shopify locally and on Atlas

In addition to default environment variables the Shopify Blueprint needs to add 2 more as follows:

- NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN
- NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL

For local development these can be added to `.env.local` and for production deployments these can be added in Atlas Dashboard. See [WP Engine headless docs for directions on how to configure Atlas Environment Variables](https://developers.wpengine.com/docs/atlas/local-app-development/frontend-app-config#2--define-environment-variables).

## For more information

For more information on this Blueprint please check out the following sources:

- [WP Engine's Atlas Platform](https://wpengine.com/headless-wordpress/)
- [Faust.js](https://faustjs.org/)
- [WPGraphQL](https://www.wpgraphql.com/)
- [Atlas Content Modeler](https://wordpress.org/plugins/atlas-content-modeler/)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [WP Engine's Atlas developer community](https://wpengine.com/builders/headless)
