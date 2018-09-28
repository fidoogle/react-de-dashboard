import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./vis.4.21.0.css";
import "./vis-timeline-graph2d.min.css";
import "./dashboard.css";
import { Redirect, HashRouter, Switch, Route, Link } from "react-router-dom";
import AreaIndex from "./components/area_index";
import DetailIndex from "./components/detail_index";
import TaskIndex from "./components/task_index";
import Service from "./components/service";
import TopNav from "./components/top_nav";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    window.location.href = "https://mydomain.com/Home.aspx";
  }

  render() {
    return (
      <div>
        <TopNav />
        <Switch>
          <Route exact path="/" component={AreaIndex} />
          <Route path="/details/:areaId" component={DetailIndex} />
          <Route path="/task/:areaId" component={TaskIndex} />
        </Switch>
      </div>
    );
  }
}

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
