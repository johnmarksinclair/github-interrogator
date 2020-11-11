import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/Nav.js";
import User from "./pages/User.js";
import Footer from "./components/Footer.js";

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
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div class="home">
            <section class="hero is-medium">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">GitHub Interrogator</h1>
                        <h2 class="subtitle">
                            Interrogate the GitHub API to build visualisation of
                            data available that elucidates some aspect of the
                            softare engineering process, such as a social graph
                            of developers and projects, or a visualisation of
                            indiviudal of team performance. Provide a
                            visualisation of this using the d3js library.
                        </h2>
                        <Link className="nav-link" to="/user">
                            <button class="button">Begin Interrogation</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
