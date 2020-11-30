import React, { Component } from "react";
import "../App.css";

class UserCard extends Component {
    render() {
        let info = this.props.data;
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by4">
                        <img src={info.avatar_url} alt="." />
                    </figure>
                </div>

                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{info.name}</p>
                            <p className="subtitle is-6">{info.location}</p>
                            <a className="subtitle is-6" href={info.html_url}>
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
        );
    }
}

export default UserCard;
