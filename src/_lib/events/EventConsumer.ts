const makeEventConsumer =
  (subscriberKey) =>
  (address, fn, opts = {}) =>
  (): void => {};
() => {};

const eventConsumer = makeEventConsumer();

export { eventConsumer, makeEventConsumer };
