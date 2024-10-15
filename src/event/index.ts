import 'server-only';
import offer from './offer';
import register from './register';

type EventManager = () => {
  [key: string]: (...args: any[]) => Promise<unknown>;
};


/**
 * Creates an instance of EventManager.
 *
 * @returns An object containing the event methods.
 */
const eventManager: EventManager = () => {
  return {
    offer,
    register
  };
};

export default eventManager();
