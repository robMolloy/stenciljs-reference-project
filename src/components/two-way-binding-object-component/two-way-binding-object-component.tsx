import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-object-component',
  shadow: true,
})
export class TwoWayBindingObjectComponent {
  @Prop() value!: { value1: string; value2: string };
  @Event() update!: EventEmitter<{ value1: string; value2: string }>;

  render() {
    return (
      <div>
        <h2>Child:</h2>
        <button onClick={() => this.update.emit({ value1: '', value2: '' })}>clear all</button>
        <br />
        <input
          type="text"
          value={this.value.value1}
          onInput={e => {
            const value1 = (e.target as HTMLInputElement).value;
            this.update.emit({ ...this.value, value1 });
          }}
        />
        <button onClick={() => this.update.emit({ ...this.value, value1: '' })}>
          clear value1
        </button>
        <br />
        <input
          type="text"
          value={this.value.value2}
          onInput={e => {
            const value2 = (e.target as HTMLInputElement).value;
            this.update.emit({ ...this.value, value2 });
          }}
        />
        <button onClick={() => this.update.emit({ ...this.value, value2: '' })}>
          clear value2
        </button>
        <pre>{JSON.stringify(this.value, undefined, 2)}</pre>
      </div>
    );
  }
}
