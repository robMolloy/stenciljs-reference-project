import { Component, h } from '@stencil/core';

@Component({
  tag: 'shared-state-child1',
  shadow: true,
})
export class SharedStateChild1 {
  render() {
    return (
      <div style={{ border: '1px solid red', marginTop: '20px' }}>
        <h2>child1</h2>
      </div>
    );
  }
}
