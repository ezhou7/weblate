import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Button, H1 } from "@blueprintjs/core";

import store from "./store";

import "./_index.css";

const HelloWorldPage = () => (
  <div>
    <H1>Hello World!</H1>
    <Button>Button</Button>
  </div>
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
