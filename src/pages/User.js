import React, { useState, useEffect } from "react";
import "../App.css";
//import api calling functions
import getProfileInfoCall from "../api/profileCall";
import getFollowersCall from "../api/followersCall";
import getReposCall from "../api/repoCall";
import getLangsCall from "../api/languageCall";
import getEventsCall from "../api/eventsCall";
//import components
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import UserCard from "../components/UserCard";

function User() {
    var [input, setInput] = useState("johnmarksinclair");
    const [disInp, setDisplayInput] = useState("");
    const [repo, setRepo] = useState("");
    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setInput(input);
        let userData = await getProfileInfoCall(input);
        if (userData.message) {
            alert("User not found");
        } else {
            console.log(userData);
            setInfo(userData);
            setFollowers(await getFollowersCall(input));
            let returnedRepos = await getReposCall(input);
            if (returnedRepos.length > 0) {
                setRepos(returnedRepos);
                setRepo(returnedRepos[0].name);
                let langData = await getLangsCall(input, returnedRepos[0].name);
                setLangs(langData);
            }
            let eventsRes = await getEventsCall(input);
            setEvents(eventsRes);
        }
    }

    async function updateDisplayedRepoData(repoName) {
        if (repoName) {
            setRepo(repoName);
            if (repos.length > 0) {
                var langData = await getLangsCall(input, repoName);
                setLangs(langData);
            }
        }
    }

    const handleInput = (e) => {
        setInput(e.target.value);
        setDisplayInput(e.target.value);
    };

    const handleSearch = async () => {
        if (input !== "") {
            getData();
        }
        setDisplayInput("");
    };

    const checkIfEnter = (pressedKey) => {
        if (pressedKey.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="user-div">
            <div className="tile is-ancestor">
                <div className="tile is-3 is-vertical is-parent">
                    <div className="tile is-12 is-child box" id="search-tile">
                        <div className="columns">
                            <div className="column is-three-fifths">
                                <input
                                    id="userInput"
                                    className="input is-small"
                                    type="text"
                                    value={disInp}
                                    placeholder="Username"
                                    onChange={handleInput}
                                    onKeyPress={checkIfEnter}
                                />
                            </div>
                            <div className="column">
                                <button
                                    className="button is-small"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-child box" id="avatar-card-tile">
                        <UserCard data={info} />
                    </div>

                    <div className="tile is-child box" id="followers-tile">
                        <p className="title">Followers</p>
                        <div>
                            {followers.map((follower) => (
                                <button
                                    className="button is-small"
                                    onClick={() => {
                                        input = follower.login;
                                        getData();
                                    }}
                                >
                                    {follower.login}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tile is-2 is-parent is-vertical">
                    <div className="tile is-child box" id="repos-tile">
                        <p class="title">Repos</p>
                        <div>
                            {repos.map((x) => (
                                <div key={x.name}>
                                    <button
                                        className="list-button"
                                        onClick={() => {
                                            updateDisplayedRepoData(x.name);
                                        }}
                                    >
                                        {x.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tile is-child box"></div>
                </div>

                <div className="tile is-parent is-vertical">
                    <div className="tile is-child box" id="lang-bar-chart-tile">
                        <p className="title">Language Usage</p>
                        <p className="subtitle">
                            Repo: {repo} - Values in lines of code
                        </p>
                        <div className="lang-char-div">
                            <BarChart data={languages} />
                        </div>
                        <div>
                            <p>
                                Select another repo from the list to see its
                                info
                            </p>
                        </div>
                    </div>
                    <div className="tile is-child box">
                        <LineChart data={events} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
