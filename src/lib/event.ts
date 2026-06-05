type Listener = () => void;
let listeners: Listener[] = [];

export const eventBus = {
  emit() {
    listeners.forEach((l) => l());
  },
  subscribe(fn: Listener) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};