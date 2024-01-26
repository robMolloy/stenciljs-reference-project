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
