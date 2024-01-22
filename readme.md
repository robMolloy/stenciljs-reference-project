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

## community router

With nearly all changes to the router you cannot rely on the hot module reloading and will need to stop then restart the server

Change app-root.tsx to;

```tsx
import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="home-page" exact={true} />
            <stencil-route url="/profile/:name" component="profile-page" exact={true} />
            <stencil-route url="/" component="error-page" />
          </stencil-route-switch>
        </stencil-router>
      </main>
    );
  }
}
```

## Project structure

Within src a recommended file/folder structure would be;

```
├── src
│   ├── components
│   │   ├── ...
│   │   ├── ...
│   ├── pages
│   │   ├── error-page
│   │   ├── home-page
│   │   ├── profile-page
│   ├── app-root.css
│   ├── app-root.tsx

```

## tsconfig strict:"true"

Make the following changes tsconfig.json;

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This will result in some small changes being required in component files with reactive state. Take for example a simple `@State()` property that doesn't get instantiated (='someValue'). This will be undefined when the component is first initialised and the use of a `?` siginifies this

```
@State() someString: string;
```

should be changed to

```
@State() someString?: string;
```

this `?` syntax will also need to be used on `@Prop`, `@Event`, `@Element` as well as a property that is storing an element using the `ref` method

Once using this you may have to use the following syntax;

```ts
if (someStringProp !== undefined) console.log(someStringProp.slice(0, 1));
```

Alternatively you can use the non-null assertion `!` to require a `@Prop`. This will also work will negate the need for undefined-check. Similarly this will work for events.

## 2-way binding
