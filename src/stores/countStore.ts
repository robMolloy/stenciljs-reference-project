class CountStore {
  value = 0;

  setValue(x: number) {
    this.value = x;
    this.dispatchUpdate();
  }
  incrementValue() {
    this.setValue(this.value + 1);
  }

  clearValue() {
    this.setValue(0);
  }

  dispatchUpdate() {
    document.body.dispatchEvent(new Event('customEvent'));
  }

  listen(cb: () => any) {
    document.body.addEventListener('customEvent', cb);
    return cb;
  }
  removeListener(cb?: () => any) {
    if (!!cb) document.body.removeEventListener('customEvent', cb);
  }
}

export const countStore = new CountStore();
