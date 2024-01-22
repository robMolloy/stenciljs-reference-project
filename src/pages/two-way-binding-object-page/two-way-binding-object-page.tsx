import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-object-page',
  shadow: true,
})
export class TwoWayBindingPage {
  @State() value = { value1: 'hello', value2: 'world' };

  render() {
    return (
      <div>
        <h2>Parent:</h2>
        <input
          type="text"
          value={this.value.value1}
          onInput={e => {
            const value1 = (e.target as HTMLInputElement).value;
            this.value = { ...this.value, value1 };
          }}
        />
        <br />
        <input
          type="text"
          value={this.value.value2}
          onInput={e => {
            const value2 = (e.target as HTMLInputElement).value;
            this.value = { ...this.value, value2 };
          }}
        />
        <pre>{JSON.stringify(this.value, undefined, 2)}</pre>
        <br />
        <br />
        <two-way-binding-object-component
          value={this.value}
          onUpdate={e => {
            this.value = e.detail;
          }}
        />
      </div>
    );
  }
}
