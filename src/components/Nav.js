import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <div class="tile is-12 is-child box">
                    <div class="columns">
                        <div class="column is-one-fifth">
                            <Link className="nav-header" to="/">
                                Github Interrogator
                            </Link>
                        </div>
                        {/* <div class="column is-one-fifth">
              <Link className="nav-link" to="/user">
                Users
              </Link>
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
