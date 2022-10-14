import { Event } from '@/_lib/events/Event';
import { ApplicationService } from '@/_lib/DDD';

type Enqueue = <E extends Event<any>>(event: E) => void;
type EventStore = {
  enqueue: Enqueue;
  getEvents: () => ReadonlyArray<Event<any>>;
};


const makeEventProvider = () => {}

const makeEventStore = () => {}

const eventProvider = makeEventProvider();

export { eventProvider, makeEventProvider };
