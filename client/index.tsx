import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";

import store from "./store";

const HelloWorldPage = () => (
  <div>Hello World!</div>
);

class App extends React.Component {
  public render() {
    const history = createBrowserHistory();

    return (
      // @ts-ignore
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/">
              <HelloWorldPage />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const appElement = document.getElementById("app");
ReactDOM.render(<App />, appElement);
