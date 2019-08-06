import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./configureStore";
import RootView from "./views/RootView";

const store = configureStore();

export function App() {
  return (
    <Provider store={store}>
      <RootView />
    </Provider>
  );
}

export default App;
