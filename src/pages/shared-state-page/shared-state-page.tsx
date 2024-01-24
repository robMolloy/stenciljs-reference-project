import { Component, h } from '@stencil/core';

@Component({
  tag: 'shared-state-page',
  shadow: true,
})
export class SharedStatePage {
  render() {
    return (
      <div>
        <shared-state-parent />
        <shared-state-separeate />
      </div>
    );
  }
}
