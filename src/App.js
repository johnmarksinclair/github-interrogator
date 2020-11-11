import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import User from "./pages/User.js";

function App() {
  document.title = "Interrogator";
  document.body.style = "background: lightblue;";

  return (
    <Router>
      <div className="main">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <div>home</div>;
}

export default App;
