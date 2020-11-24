async function getLangs(username, repoName) {
    const languages = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    const languagesJSON = await languages.json();
    //console.log(languagesJSON);
    // convert to array
    var arr = [];
    for (var i in languagesJSON) {
        arr.push([i, languagesJSON[i]]);
    }
    //console.log(arr);

    return arr;
}

export default getLangs;
