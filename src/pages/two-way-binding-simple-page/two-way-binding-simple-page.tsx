import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-simple-page',
  shadow: true,
})
export class TwoWayBindingPage {
  @State() value = 'hello world';

  render() {
    return (
      <div>
        <h2>Parent:</h2>
        <input
          type="text"
          value={this.value}
          onInput={e => (this.value = (e.target as HTMLInputElement).value)}
        />
        {this.value}
        <br />
        <br />
        <two-way-binding-simple-component
          value={this.value}
          onUpdate={e => (this.value = e.detail)}
        />
      </div>
    );
  }
}
