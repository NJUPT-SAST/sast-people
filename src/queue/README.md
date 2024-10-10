# How to add more Triggers?

triggers are managed by the following structure.

## Triggers workflow

```
[actions]or[steps] -> [event] -> [queue]
```

1. you can add a new event in the `events` folder, here's an example
```tsx
// events/greet.ts
export default async function greet(message: string) {
  console.log(message)
}
```
then you can register the event in the `eventManager` in `index.ts`
```tsx
// index.ts
import greet from "./greet"
const eventManager: EventManager = () => {
  return {
    // ……
    // other events
    greet,
  };
};
```

2. you can trigger an event in actions or steps, here's an example
```tsx
// assumed that we've registered an event called "greet"
eventManager.greet("hello, world")
```
If you have a step called "greet", it will be triggered automatically when the flow reaches the step.

1. you can add a new queue to do time-consuming tasks, here's an example
```tsx
// queues/greet.ts
export const greet = mqClient.createFunction(
  { id: 'greet' },
  { event: 'greet' },
  async ({ event, step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
);
```
then you can register the queue in `index.ts`
```tsx
export default [
    // ……,
    greet
    ];
```

## Helpful links
http://localhost:8288/runs
