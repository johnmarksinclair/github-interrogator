import React, { useState, useEffect } from "react";
import "../App.css";
import getProfileInfo from "../api/profileCall";
import getLangs from "../api/languageCall";
import getFollowers from "../api/followersCall";
import getRepos from "../api/repoCall";

function User() {
    const [input, setInput] = useState("johnmarksinclair");
    const [repo, setRepo] = useState("College");

    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setInfo(await getProfileInfo(input));
        //todo display friends not followers
        setFollowers(await getFollowers(input));
        setRepos(await getRepos(input));
        setLangs(await getLangs(input, repo));
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    //todo error handling
    const handleSearch = async () => {
        if (input != "") {
            setRepo("");
            getData();
        }
    };

    const checkIfEnter = (pressedKey) => {
        if (pressedKey.key === "Enter") {
            handleSearch();
        }
    };

    //todo make pick first repo as default for lang showcase

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
                    <div class="tile is-child box">
                        <p class="title">Followers</p>
                        <div>
                            {followers.map((follower) => (
                                <button
                                    className="button is-small"
                                    onClick={() => {
                                        setInput(follower.login);
                                        handleSearch();
                                    }}
                                >
                                    {follower.login}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tile is-3 is-parent is-vertical">
                    {/* <div class="tile is-child box">
                        <p class="title">Followers</p>
                        <div>
                            {followers.map((follower) => (
                                <div>
                                    <button
                                        className="button is-small"
                                        onClick={() => {
                                            setInput(follower.login);
                                            handleSearch();
                                        }}
                                    >
                                        {follower.login}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <div class="tile is-child box">
                        <p class="title">Repositories</p>
                        <div>
                            {repos.map((x) => (
                                <div key={x.name}>
                                    <button
                                        className="list-button"
                                        onClick={() => {
                                            setRepo(x.name);
                                            getData();
                                        }}
                                    >
                                        {x.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tile is-parent is-vertical">
                    <div className="tile is-child box">
                        <p class="title">Language Usage - {repo}</p>
                        <div>
                            {languages.map((language) => (
                                <div key={language}>
                                    <button className="list-button">
                                        {language}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tile is-child box"></div>
                </div>
            </div>
        </div>
    );
}

export default User;
