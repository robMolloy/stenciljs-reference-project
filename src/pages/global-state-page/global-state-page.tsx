import { Component, State, h } from '@stencil/core';
import { countStore } from '../../stores/countStore';

@Component({
  tag: 'global-state-page',
  shadow: true,
})
export class TwoWayBindingObjectPage {
  @State() value = countStore.value;
  @State() showValue = true;

  async componentDidLoad() {
    document.body.addEventListener('customEvent', () => {
      this.value = countStore.value;
    });
  }

  render() {
    return (
      <div>
        <h2>Page component</h2>

        {this.value}

        <br />
        <button onClick={() => countStore.clearValue()}>clear</button>
        <br />
        <button onClick={() => countStore.incrementValue()}>inc</button>
        <br />
        <button onClick={() => countStore.setValue(40)}>set to 40</button>
        <br />

        <button onClick={() => (this.showValue = !this.showValue)}>toggle show child</button>
        {this.showValue && <global-state-child />}
      </div>
    );
  }
}
