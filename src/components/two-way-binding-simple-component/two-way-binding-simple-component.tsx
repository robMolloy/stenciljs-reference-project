import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-simple-component',
  shadow: true,
})
export class TwoWayBindingComponent {
  @Prop() value!: string;

  @State() actualValue = '';
  @Event() update!: EventEmitter<string>;

  @Watch('value') watchValue(newValue: string) {
    this.actualValue = newValue;
  }
  @Watch('actualValue') watchActualValue(newValue: string) {
    this.update.emit(newValue);
  }

  render() {
    return (
      <div>
        <h2>Child:</h2>
        <input
          type="text"
          value={this.value}
          onInput={e => (this.actualValue = (e.target as HTMLInputElement).value)}
        />
        {this.value}
      </div>
    );
  }
}
