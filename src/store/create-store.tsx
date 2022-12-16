import React, {
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

export function createStore<T>(initialState: T) {
  function useInitStore() {
    const store = useRef(initialState);
    const subscribers = useRef(new Set<(store: T) => void>());

    const get = useCallback(() => store.current, []);

    const set = useCallback((value: Partial<T>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((subscriber) => subscriber(store.current));
    }, []);

    const subscribe = useCallback((callback: (store: T) => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const StoreContext = React.createContext<ReturnType<
    typeof useInitStore
  > | null>(null);

  interface ProviderProps {
    children?: React.ReactNode;
  }

  const StoreProvider: React.FC<ProviderProps> = ({ children }) => {
    return (
      <StoreContext.Provider value={useInitStore()}>
        {children}
      </StoreContext.Provider>
    );
  };

  function useStore<U>(selector: (store: T) => U) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Cannot access StoreContext outside StoreProvider");
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.set];
  }

  return [StoreProvider, useStore];
}
