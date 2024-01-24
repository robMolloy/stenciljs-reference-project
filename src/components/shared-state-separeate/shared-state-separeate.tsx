import { Component, h } from '@stencil/core';

@Component({
  tag: 'shared-state-separeate',
  shadow: true,
})
export class SharedStateSepareate {
  render() {
    return (
      <div style={{ border: '1px solid red', marginTop: '20px' }}>
        <h2>separate</h2>
      </div>
    );
  }
}
