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

## Prettier config

The max character width is set higher than the industry-norm so you may want to change the printWidth to a more familiar amount within `.prettierrc.json`.

```json
{
  "printWidth": 100
}
```

## tsconfig strict:"true"

Make the following changes tsconfig.json;

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
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

## Two-way binding

To enable two-way binding the child component emits any changes made within the component and the parent maintains the mutable variable. The following example is for a simple string variable and can be looked up in `two-way-binding-simple-page`. For a more complex variable reference `two-way-binding-object-page`.

```tsx
// child-component
@Component({
  tag: 'child-component',
  shadow: true,
})
export class ChildComponent {
  @Prop() value!: string;
  @Event() update!: EventEmitter<string>;

  render() {
    return (
      <div>
        <h2>Child:</h2>
        <input
          type="text"
          value={this.value}
          onInput={e => this.update.emit((e.target as HTMLInputElement).value)}
        />
        <button onClick={() => this.update.emit('')}>clear</button>
        {this.value}
      </div>
    );
  }
}
```

```tsx
// parent-component
@Component({
  tag: 'parent-component',
  shadow: true,
})
export class ParentComponent {
  @State() value = 'hello world';

  render() {
    return (
      <div>
        <h2>Parent:</h2>
        <input
          type="text"
          value={this.value}
          onInput={e => (this.value = (e.target as HTMLInputElement).value)}
        />
        {this.value}
        <br />
        <br />
        <child-component value={this.value} onUpdate={e => (this.value = e.detail)} />
      </div>
    );
  }
}
```

## Inferring types from component classes

You can import the component class from another file to act as a type

```tsx
import { Component, State, h } from '@stencil/core';
import { ChildComponent } from '../../components/ChildComponent/ChildComponent';

@Component({
  tag: 'parent-component',
  shadow: true,
})
export class ParentComponent {
  @State() value: ChildComponent['update'] = { value1: 'hello', value2: 'world' };

  render() {
    return <div>{this.value}</div>;
  }
}
```

If you need to get the argument type from an EventEmitter use the following;

```tsx
type InferArgFromEventEmitter<T extends EventEmitter<any> | undefined> = T extends EventEmitter<
  infer U
>
  ? U
  : never;

@Component({
  tag: 'parent-component',
  shadow: true,
})
export class ParentComponent {
  @State() value: InferArgFromEventEmitter<ChildComponent['update']> = {
    value1: 'hello',
    value2: 'world',
  };

  render() {
    return <div>{this.value}</div>;
  }
}
```

## State management

There is no default state management solution for stencil or another webcomponent solution. The following solution uses something similar to the the 2-way-binding solution but by leveraging the dispatchEvent property on a global dom element (such as document or document.body) a rudimentary state management solution can be created;

```tsx
class CountStore {
  value = 0;

  setValue(x: number) {
    this.value = x;
    this.dispatchUpdate();
  }
  incrementValue() {
    this.setValue(this.value + 1);
  }

  clearValue() {
    this.setValue(0);
  }

  dispatchUpdate() {
    document.body.dispatchEvent(new Event('customEvent'));
  }

  listen(cb: () => any) {
    document.body.addEventListener('customEvent', cb);
    return cb;
  }
  removeListener(cb?: () => any) {
    if (!!cb) document.body.removeEventListener('customEvent', cb);
  }
}

export const countStore = new CountStore();
```

```tsx
import { Component, State, h } from '@stencil/core';
import { countStore } from '../../stores/countStore';

@Component({
  tag: 'global-state-child',
  shadow: true,
})
export class somePage {
  @State() value = countStore.value;
  countStoreListener?: ReturnType<typeof countStore.listen>;

  async componentWillLoad() {
    this.countStoreListener = countStore.listen(() => {
      this.value = countStore.value;
    });
  }
  disconnectedCallback() {
    if (this.countStoreListener) countStore.removeListener(this.countStoreListener);
  }

  render() {
    return (
      <div>
        <h2>Chld component</h2>

        {this.value}

        <button onClick={() => countStore.incrementValue()}>inc</button>
      </div>
    );
  }
}
```

## Global styles

Docs are lacking within Stencil but there is a helpful hint within the app.css file when starting a new app.

It would appear that global styles can only be applied to the body element which among the normal css properties can enable the choice of font for the whole app. Within the :root the use of css variables can be set;

```css
/* app.css */
:root {
  --color-primary: blue;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: 'Trebuchet MS', sans-serif;
}
```

```tsx
@Component({
tag: 'consumer-component',
shadow: true,
styles: `
h2 {
  color: var(--color-primary);
}
`,
})
```

## hooks

React-style hooks will only be available once mixins are available
~~haunted js https://www.npmjs.com/package/haunted~~ (don't think this is possible)

### alt-hooks

```ts

/* types */
type TFetchData = { success: true; data: TData } | { success: false; error: { message: string } };
type TFetchDataSuccess = Extract<TFetchData, {success:true}>
type TFetchDataFail = Extract<TFetchData, {success:false}>

/* pure fetch */
const fetchData: TFetchData = () => {
  ...
};

/* fetch "hook" */
const useFetchData = async (p: {
  onLoadingStart: () => any;
  onLoadingFinish: () => any;
  onDataSuccess: (data: TFetchDataSuccess['data']) => any;
  onDataFail: (error: TFetchDataFail['error']['message']) => any;
}) => {
  p.onLoadingStart();
  const response = await fetchData();
  if (response.success) p.onDataSuccess(response.data);
  else p.onDataFail(response.error.message);
  p.onLoadingFinish();
};

/* hook consumption */
@Component({
  tag: 'some-component',
  shadow: true,
})
export class someComponent {
  @State() value?: TFetchDataSuccess['data'] = undefined;
  @State() loading = false;
  @State() error = false;
  @State() errorMessage = '';
  countStoreListener?: ReturnType<typeof countStore.listen>;

  async componentDidLoad() {
    useFetchData({
      onLoadingStart: () => (this.loading = true),
      onLoadingFinish: () => (this.loading = false),
      onDataSuccess: (data: TFetchDataSuccess['data']) => (this.data = data),
      onDataFail: (error: TFetchDataFail['error']) => {
        this.error = true;
        this.errorMessage = error.message;
      },
    })
  }

  render() {
    return (
      <div>
        {!!this.loading && <div><loading-spinner /></div>}
        {!!this.error && <div>Error: {this.errorMessage}</div>}
        {!!this.data && <pre>{JSON.stringify(this.data, undefined, 2)}</pre>}
      </div>
    );
  }
}
```
