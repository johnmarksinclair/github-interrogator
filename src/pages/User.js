import React, { useState, useEffect } from "react";
import "../App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";

function User() {
    const [input, setInput] = useState("");
    const [info, setInfo] = useState({});

    useEffect(() => {
        fetch(`https://api.github.com/users/johnmarksinclair`).then((res) =>
            res.json().then((data) => {
                setInfo(data);
                console.log(data);
            })
        );
    }, []);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = async () => {
        const data = await fetch(`https://api.github.com/users/${input}`);
        const dataJSON = await data.json();
        setInfo(dataJSON);
        //this.userInput.value = "";
    };

    const checkIfEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="user-div">
            <div class="tile is-ancestor">
                <div class="tile is-3 is-vertical is-parent">
                    <div class="tile is-12 is-child box">
                        <div class="columns">
                            <div class="column is-three-fifths">
                                <input
                                    id="userInput"
                                    class="input is-small"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleInput}
                                    onKeyPress={checkIfEnter}
                                />
                            </div>
                            <div class="column">
                                <button
                                    class="button is-small"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="tile is-child box">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by4">
                                    <img src={info.avatar_url} alt="." />
                                </figure>
                            </div>

                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4">{info.name}</p>
                                        <p class="subtitle is-6">
                                            {info.location}
                                        </p>
                                        <a
                                            class="subtitle is-6"
                                            href={info.html_url}
                                        >
                                            @{info.login}
                                        </a>
                                    </div>
                                </div>

                                <div class="content">
                                    <div class="columns">
                                        <div class="column">
                                            {info.followers} Followers
                                        </div>
                                        <div class="column">
                                            {info.following} Following
                                        </div>
                                    </div>
                                    <p>{info.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title">Three</p>
                        <p>Lorem</p>
                        <p>Suspendisse</p>
                        <p>Integer</p>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title">Four</p>
                        <p>Lorem</p>
                        <p>Suspendisse</p>
                        <p>Integer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
