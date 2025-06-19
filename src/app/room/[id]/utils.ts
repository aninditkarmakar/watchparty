// Debounced event queue utility for VideoPlayer
export type DebouncedEvent<T extends string, U> = { type: T; payload: U };

export function createDebouncedEventQueue<T extends string, U>(
  debounceMs: number,
  onFlush: (events: DebouncedEvent<T, U>[]) => void
) {
  let debounceTimer: NodeJS.Timeout | null = null;
  let eventQueue: DebouncedEvent<T, U>[] = [];

  const queueEvent = (type: T, payload: U) => {
    eventQueue.push({ type, payload });
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (eventQueue.length > 0) {
        onFlush([...eventQueue]);
        eventQueue = [];
      }
    }, debounceMs);
  };

  const flush = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (eventQueue.length > 0) {
      onFlush([...eventQueue]);
      eventQueue = [];
    }
  };

  return { queueEvent, flush };
}
