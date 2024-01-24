import { Component, h } from '@stencil/core';

@Component({
  tag: 'shared-state-child2',
  shadow: true,
})
export class SharedStateChild2 {
  render() {
    return (
      <div style={{ border: '1px solid red', marginTop: '20px' }}>
        <h2>child2</h2>
      </div>
    );
  }
}
