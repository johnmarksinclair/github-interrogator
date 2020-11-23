async function getLangs(username, repoName) {
    const data = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    const dataJSON = await data.json();
    return dataJSON;
}

export default getLangs;
