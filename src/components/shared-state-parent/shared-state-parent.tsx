import { Component, h } from '@stencil/core';

@Component({
  tag: 'shared-state-parent',
  shadow: true,
})
export class SharedStateParent {
  render() {
    return (
      <div style={{ border: '1px solid red', marginTop: '20px' }}>
        <h2>parent</h2>
        <shared-state-child1 />
        <shared-state-child2 />
      </div>
    );
  }
}
