import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-simple-component',
  shadow: true,
})
export class TwoWayBindingComponent {
  @Prop() value!: string;
  @Event() update!: EventEmitter<string>;

  render() {
    return (
      <div>
        <h2>Child:</h2>
        <input
          type="text"
          value={this.value}
          onInput={e => this.update.emit((e.target as HTMLInputElement).value)}
        />
        <button onClick={() => this.update.emit('')}>clear</button>
        {this.value}
      </div>
    );
  }
}
