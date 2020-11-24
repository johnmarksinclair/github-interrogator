import React, { useState, useEffect } from "react";
import "../App.css";
//import api calling functions
import getProfileInfo from "../api/profileCall";
import getLangs from "../api/languageCall";
import getFollowers from "../api/followersCall";
import getRepos from "../api/repoCall";
//import components
import BarChart from "../components/BarChart";

const dataset = [
    [10, 30, 40, 20],
    [10, 40, 30, 20, 50, 10],
    [60, 30, 40, 20, 30],
];
var i = 0;

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
        changeLangChartData();
    }, []);

    async function initData() {
        setInfo(await getProfileInfo(input));
        setFollowers(await getFollowers(input));
        var returnedRepos = await getRepos(input);
        if (returnedRepos.length > 0) {
            setRepos(returnedRepos);
            setRepo(returnedRepos[0].name);
            setLangs(await getLangs(input, returnedRepos[0].name));
        }
    }

    async function getData() {
        setInput(input);
        setInfo(await getProfileInfo(input));
        setFollowers(await getFollowers(input));
        var returnedRepos = await getRepos(input);
        setRepos(returnedRepos);
        setRepo(returnedRepos[0].name);
        setLangs(await getLangs(input, returnedRepos[0].name));
    }

    async function updateDisplayedRepoData(repoName) {
        if (repoName) {
            setRepo(repoName);
            if (repos.length > 0) setLangs(await getLangs(input, repoName));
        }
    }

    const changeLangChartData = () => {
        //console.log(dataset);
        setLangChartData(dataset[i++]);
        if (i === dataset.length) i = 0;
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
            <div class="tile is-ancestor">
                <div class="tile is-3 is-vertical is-parent">
                    <div class="tile is-12 is-child box" id="search-tile">
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

                    <div class="tile is-child box" id="avatar-card-tile">
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

                    <div class="tile is-child box" id="followers-tile">
                        <p class="title">Followers</p>
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
                    <div class="tile is-child box" id="repos-tile">
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
                        <div className="columns">
                            <div className="column is-10">
                                <p class="title">Language Usage</p>
                                <p className="subtitle">Repo: {repo}</p>
                            </div>
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
                            {languages.map((language) => (
                                <div key={language}>
                                    <button className="list-button">
                                        {language}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
