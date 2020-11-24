import React, { useState, useEffect } from "react";
import "../App.css";
//import api calling functions
import getProfileInfo from "../api/profileCall";
import getLangs from "../api/languageCall";
import getFollowers from "../api/followersCall";
import getRepos from "../api/repoCall";
//import components
import BarChart from "../components/BarChart";

const dataset = [[10, 30, 40, 20]];
// const dataset = [
//     { language: "python", value: 20 },
//     { language: "java", value: 40 },
//     { language: "c", value: "25" },
// ];
//todo ^^ this is what my data currently looks like

function User() {
    var [input, setInput] = useState("johnmarksinclair");
    const [repo, setRepo] = useState("");

    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [repos, setRepos] = useState([]);

    const [langChartData, setLangChartData] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    async function initData() {
        setInfo(await getProfileInfo(input));
        setFollowers(await getFollowers(input));
        var returnedRepos = await getRepos(input);
        if (returnedRepos.length > 0) {
            setRepos(returnedRepos);
            setRepo(returnedRepos[0].name);
            setLangs(await getLangs(input, returnedRepos[0].name));
            console.log(dataset);
        }
        updateLangData(dataset[0]);
    }

    async function getData() {
        setInput(input);
        setInfo(await getProfileInfo(input));
        setFollowers(await getFollowers(input));
        var returnedRepos = await getRepos(input);
        setRepos(returnedRepos);
        setRepo(returnedRepos[0].name);
        setLangs(await getLangs(input, returnedRepos[0].name));
        updateLangData(dataset[0]);
    }

    async function updateDisplayedRepoData(repoName) {
        if (repoName) {
            setRepo(repoName);
            if (repos.length > 0) setLangs(await getLangs(input, repoName));
        }
        updateLangData(dataset[0]);
    }

    const updateLangData = (data) => {
        setLangChartData(data);
    };

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = async () => {
        if (input !== "") {
            getData();
        }
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
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by4">
                                    <img src={info.avatar_url} alt="." />
                                </figure>
                            </div>

                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">
                                            {info.name}
                                        </p>
                                        <p className="subtitle is-6">
                                            {info.location}
                                        </p>
                                        <a
                                            className="subtitle is-6"
                                            href={info.html_url}
                                        >
                                            @{info.login}
                                        </a>
                                    </div>
                                </div>

                                <div className="content">
                                    <div className="columns">
                                        <div className="column">
                                            {info.followers} Followers
                                        </div>
                                        <div className="column">
                                            {info.following} Following
                                        </div>
                                    </div>
                                    <p>{info.bio}</p>
                                </div>
                            </div>
                        </div>
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
                        <p className="subtitle">Repo: {repo}</p>
                        <div className="lang-char-div" id="langChartDiv">
                            <BarChart
                                width={600}
                                height={300}
                                data={langChartData}
                            />
                        </div>
                        <p>Selct another repo from the list to see its info</p>
                    </div>
                    <div className="tile is-child box">
                        <div>
                            {/* <div className="column">
                                <button
                                    className="button"
                                    onClick={() => {
                                        changeLangChartData();
                                    }}
                                >
                                    Cycle Repos
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
