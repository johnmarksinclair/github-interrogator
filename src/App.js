import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import Nav from "./components/OldNav.js";
import Nav from "./components/Nav";
import User from "./pages/User.js";

function App() {
    document.title = "Interrogator";

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
    return (
        <div className="home">
            <section className="hero is-medium">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            <p>
                                <strong>GitHub Interrogator</strong> by{" "}
                                <a href="https://github.com/johnmarksinclair">
                                    John Sinclair
                                </a>
                            </p>
                        </h1>
                        <h2 className="subtitle">
                            Interrogate the GitHub API to build visualisation of
                            data available that elucidates some aspect of the
                            softare engineering process, such as a social graph
                            of developers and projects, or a visualisation of
                            indiviudal of team performance. Provide a
                            visualisation of this using the d3js library.
                        </h2>
                        <Link className="nav-link" to="/user">
                            <button className="button">
                                Begin Interrogation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
