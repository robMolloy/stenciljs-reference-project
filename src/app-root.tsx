import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="home-page" exact={true} />
              <stencil-route url="/profile/:name" component="profile-page" exact={true} />
              <stencil-route
                url="/two-way-binding-simple-page"
                component="two-way-binding-simple-page"
                exact={true}
              />
              <stencil-route
                url="/two-way-binding-object-page"
                component="two-way-binding-object-page"
                exact={true}
              />
              <stencil-route url="/global-state-page" component="global-state-page" exact={true} />

              <stencil-route url="/" component="error-page" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
