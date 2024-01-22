import { Component, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-component',
  shadow: true,
})
export class TwoWayBindingComponent {
  render() {
    return <div>two-way-binding-component</div>;
  }
}
