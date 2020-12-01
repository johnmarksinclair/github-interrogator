import React, { useState, useEffect } from "react";
import "../App.css";
//import api calling functions
import getProfileInfoCall from "../api/profileCall";
import getFollowersCall from "../api/followersCall";
import getFollowingCall from "../api/followingCall";
import getReposCall from "../api/repoCall";
import getLangsCall from "../api/languageCall";
import getEventsCall from "../api/eventsCall";
import getRateLimitCall from "../api/rateLimitCall";
//import components
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart";
import LanguageChart from "../components/LanguageChart";
import ActivityChart from "../components/ActivityChart";

function User() {
    var [input, setInput] = useState("johnmarksinclair");
    const [disInp, setDisplayInput] = useState("");
    const [repo, setRepo] = useState("");
    const [info, setInfo] = useState({});
    const [languages, setLangs] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [repos, setRepos] = useState([]);
    //const [events, setEvents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setInput(input);
        let userData = await getProfileInfoCall(input);
        if (userData.message) {
            alert("User not found");
        } else {
            setInfo(userData);
            setFollowers(await getFollowersCall(input));
            setFollowing(await getFollowingCall(input));
            let returnedRepos = await getReposCall(input);
            if (returnedRepos.length > 0) {
                setRepos(returnedRepos);
                setRepo(returnedRepos[0]);
                let langData = await getLangsCall(input, returnedRepos[0].name);
                setLangs(langData);
            }
            // let eventsRes = await getEventsCall(input);
            // setEvents(eventsRes);
        }
        checkReqLimit();
    }

    async function updateDisplayedRepoData(repo) {
        if (repo) {
            setRepo(repo);
            if (repos.length > 0) {
                let langData = await getLangsCall(input, repo.name);
                setLangs(langData);
            }
        }
        console.log(repo.description);
        checkReqLimit();
    }

    const checkReqLimit = async () => {
        let remaining = await getRateLimitCall();
        if (remaining === 0) alert(`${remaining} API calls left`);
        else if (remaining < 10)
            alert(`Running low on API calls! ${remaining} calls left`);
    };

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
            <div className="columns">
                <div className="column is-one-quarter">
                    <div className="shadow-div">
                        <div className="search-div">
                            <input
                                id="userInput"
                                className="input is-small"
                                type="text"
                                value={disInp}
                                placeholder="Username"
                                onChange={handleInput}
                                onKeyPress={checkIfEnter}
                            />
                            <button
                                className="button is-small"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="vert-spacer-div"></div>
                    <div className="shadow-div">
                        <UserCard data={info} />
                    </div>
                    <div className="vert-spacer-div"></div>
                    <div className="shadow-div">
                        <div className="column">
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
                </div>
                <div className="column is-one-fifth">
                    <div className="shadow-div">
                        <div className="column">
                            <p class="title">Repos</p>
                            <div>
                                {repos.map((x) => (
                                    <div key={x.name}>
                                        <button
                                            className="list-button"
                                            onClick={() => {
                                                updateDisplayedRepoData(x);
                                            }}
                                        >
                                            {x.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="vert-spacer-div"></div>
                    <div className="shadow-div">
                        <div className="column">
                            <p className="title">Following</p>
                            <div>
                                {following.map((person) => (
                                    <button
                                        className="button is-small"
                                        onClick={() => {
                                            input = person.login;
                                            getData();
                                        }}
                                    >
                                        {person.login}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="shadow-div">
                        <div className="column">
                            <p className="title">Repo: {repo.name}</p>
                            <p>Description: {repo.description}</p>
                        </div>
                    </div>
                    <div className="vert-spacer-div"></div>
                    <div className="shadow-div">
                        <LanguageChart langs={languages} />
                    </div>
                    <div className="vert-spacer-div"></div>
                    <div className="shadow-div">
                        <ActivityChart login={input} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;
