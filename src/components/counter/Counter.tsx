import React from "react";
import { useStore } from "../../App";

export const Counter = () => {
  const [count, setStore] = useStore((store) => store.count);

  const increment = () => {
    setStore((store) => ({
      ...store,
      count: store.count + 1,
    }));
  };

  const decrement = () => {
    setStore((store) => ({
      ...store,
      count: store.count - 1,
    }));
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <output>{count}</output>
      <button onClick={increment}>+</button>
    </div>
  );
};
