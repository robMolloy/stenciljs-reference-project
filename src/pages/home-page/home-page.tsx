import { Component, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with
          web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
        <br />
        <stencil-route-link url="/two-way-binding-simple-page">
          <button>two-way-binding-simple-page</button>
        </stencil-route-link>
        <br />
        <stencil-route-link url="/two-way-binding-object-page">
          <button>two-way-binding-object-page</button>
        </stencil-route-link>
        <br />
        <stencil-route-link url="/any-other-page">
          <button>error page</button>
        </stencil-route-link>
        <br />
        <stencil-route-link url="/global-state-page">
          <button>global state page</button>
        </stencil-route-link>
      </div>
    );
  }
}
