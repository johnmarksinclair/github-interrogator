async function getLangs(username, repoName) {
    const data = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    const dataJSON = await data.json();
    // convert to array
    var arr = [];
    for (var i in dataJSON) {
        arr.push([i, dataJSON[i]]);
    }
    //console.log(arr);
    return arr;
}

export default getLangs;
