import React, { useState, useEffect } from "react";
import "../App.css";
import getProfileInfo from "../api/profileCall";
import getLangs from "../api/languageCall";
import getFollowers from "../api/followersCall";

function User() {
    const [input, setInput] = useState("");
    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState({});
    const [followers, setFollowers] = useState({});

    useEffect(() => {
        async function getData() {
            var profInfo = await getProfileInfo("johnmarksinclair");
            setInfo(profInfo);
            var langInfo = await getLangs("johnmarksinclair");
            setLangs(langInfo);
            var followersInfo = await getFollowers("johnmarksinclair");
            setFollowers(followersInfo);
            console.log(followersInfo[0].login);
        }
        getData();
    }, []);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = async () => {
        const profInfo = await getProfileInfo(input);
        setInfo(profInfo);
        const langInfo = await getLangs(input);
        setLangs(langInfo);
        const followersInfo = await getFollowers(input);
        setFollowers(followersInfo);
        console.log(followersInfo[0].login);
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
                        <p class="title">Language Usage</p>
                        <p>
                            {languages.HTML != null
                                ? "HTML: " + languages.HTML
                                : null}
                        </p>
                        <p>
                            {languages.JavaScript != null
                                ? "JavaScript: " + languages.JavaScript
                                : null}
                        </p>
                        <p>
                            {languages.Python != null
                                ? "Python: " + languages.Python
                                : null}
                        </p>
                        <p>
                            {languages.Solidity != null
                                ? "Solidity: " + languages.Solidity
                                : null}
                        </p>
                        <p>
                            {languages.Dart != null
                                ? "Dart: " + languages.Dart
                                : null}
                        </p>
                        <p>
                            {languages.CSS != null
                                ? "CSS: " + languages.CSS
                                : null}
                        </p>
                        <p>
                            {languages.Java != null
                                ? "Java: " + languages.Java
                                : null}
                        </p>
                        <p>
                            {languages.C != null ? "C: " + languages.C : null}
                        </p>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
