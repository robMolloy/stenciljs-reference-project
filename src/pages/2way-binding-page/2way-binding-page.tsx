import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-page',
  shadow: true,
})
export class TwoWayBindingPage {
  @State() value = 'hello workkld';
  @State() showClearButton = true;

  comp?: HTMLTwoWayBindingComponentElement = undefined;

  render() {
    return (
      <div>
        <div>ParentValue:{this.value}</div>
        ParentInput:
        <input
          type="text"
          value={this.value}
          onInput={e => (this.value = (e.target as HTMLInputElement).value)}
        />
        <button onClick={() => (this.value = '')}>clear from parent</button>
        <button onClick={() => (this.showClearButton = !this.showClearButton)}>
          toggle clear button (child)
        </button>
        <br />
        <br />
        <two-way-binding-component
          ref={elm => (this.comp = elm)}
          value={this.value}
          onUpdate={e => {
            this.value = e.detail;
          }}
          showClearButton={this.showClearButton}
        />
      </div>
    );
  }
}
