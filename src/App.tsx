import React from "react";
import { Counter } from "./components";
import { createStore } from "./store";

export const { StoreProvider, useStore } = createStore({
  count: 0,
});

function App() {
  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  );
}

export default App;
