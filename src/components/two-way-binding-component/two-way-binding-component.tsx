import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'two-way-binding-component',
  shadow: true,
})
export class TwoWayBindingComponent {
  @Prop() value!: string;
  @Prop() showClearButton: boolean = false;
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
        {JSON.stringify({ clear: this.showClearButton })}
        <div>ChildValue:{this.value}</div>
        ChildInput:
        <input
          type="text"
          value={this.value}
          onInput={e => (this.actualValue = (e.target as HTMLInputElement).value)}
        />
        {this.showClearButton && (
          <button
            onClick={() => {
              this.actualValue = 'q';
              this.actualValue = '';
            }}
          >
            x
          </button>
        )}
      </div>
    );
  }
}
