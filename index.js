class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      for (let callback of this.events[eventName]) {
        callback(...args);
      }
    }
  }

  async once(eventName) {
    return new Promise((resolve) => {
      this.on(eventName, (...args) => {
        resolve(args);
      });
    });
  }
}

// Usage example:
const emitter = new EventEmitter();

// Subscribe to events
emitter.on('message', (msg) => {
  console.log('Subscriber 1 received:', msg);
});

emitter.on('message', (msg) => {
  console.log('Subscriber 2 received:', msg);
});

// Publish an event
emitter.emit('message', 'Hello, world!');

// Wait for the 'message' event to be emitted once
(async () => {
  const [msg] = await emitter.once('message');
  console.log('Waited for message:', msg);
})();
