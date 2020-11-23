import React, { useState, useEffect } from "react";
import "../App.css";
import getProfileInfo from "../api/profileCall";
import getLangs from "../api/languageCall";
import getFollowers from "../api/followersCall";
import getRepos from "../api/repoCall";

function User() {
    const [input, setInput] = useState("johnmarksinclair");
    const [repo, setRepo] = useState("college");

    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState({});
    const [followers, setFollowers] = useState([]);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setInfo(await getProfileInfo(input));
        setFollowers(await getFollowers(input));
        setRepos(await getRepos(input));
        setLangs(await getLangs(input, repo));
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = async () => {
        getData();
    };

    const checkIfEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="user-div">
            <div class="tile is-ancestor">
                <div class="tile is-2 is-vertical is-parent">
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

                <div className="tile is-3 is-parent is-vertical">
                    <div class="tile is-child box">
                        <p class="title">Followers</p>
                        <div>
                            {followers.map((follower) => (
                                <button className="button">
                                    {follower.login}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div class="tile is-child box">
                        <p class="title">Repositorys</p>
                        <div>
                            {repos.map((e) => (
                                <div>
                                    <button className="list-button">
                                        {e.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tile is-parent is-vertical">
                    <div className="tile is-child box">
                        <p class="title">Language Usage</p>
                        <p>Select a repository to view language stats</p>
                        <div>{JSON.stringify(languages)}</div>
                    </div>
                    <div className="tile is-child box"></div>
                </div>
            </div>
        </div>
    );
}

export default User;
