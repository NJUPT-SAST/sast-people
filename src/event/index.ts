import 'server-only';
import offer from './offer';
import register from './register';

type EventManager = () => {
  [key: string]: (...args: any[]) => Promise<unknown>;
};

const eventManager: EventManager = () => {
  return {
    offer,
    register
  };
};

export default eventManager();
