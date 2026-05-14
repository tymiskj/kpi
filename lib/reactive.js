export class ReactiveEmitter {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    
    this.listeners.get(eventName).add(callback);

    return () => {
      this.listeners.get(eventName).delete(callback);
    };
  }

  emit(eventName, payload) {
    if (this.listeners.has(eventName)) {
      for (const callback of this.listeners.get(eventName)) {
        callback(payload);
      }
    }
  }
}