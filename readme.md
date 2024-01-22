# Stencil reference project

## setup

This project was created using `npm init stencil` and `app` was the chosen project type

## issues

At time of writing there is an issue with the `app` project type getting typescript errors when first loaded. The related issue can be found here https://github.com/stencil-community/stencil-app-starter/issues/92 and is currently unresolved. To resolve add the following within package.json (resolutions works with yarn, overrides works with npm, feel free to delete as it suits you)

```json
{
  "resolutions": {
    "@types/babel__traverse": "7.0.6"
  },
  "overrides": {
    "@types/babel__traverse": "7.0.6"
  }
}
```

## getting started

Simply run;

`npm i && npm run start` or `yarn && yarn start`

## 2-way binding
