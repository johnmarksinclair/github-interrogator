async function getLangs(input) {
    const data = await fetch(`https://api.github.com/users/${input}/repos`);
    const dataJSON = await data.json();
    var length = Object.keys(dataJSON).length;
    var i, repo, langData, lDataJSON;
    var allLangsJSON = {};
    for (i = 0; i < length; i++) {
        repo = dataJSON[i].name;
        //console.log("name: " + repo);
        langData = await fetch(
            `https://api.github.com/repos/${input}/${repo}/languages`
        );
        lDataJSON = langData.json();
        allLangsJSON = lDataJSON; // TODO get rid of this
        // TODO need to add temp json to total json values
    }
    return allLangsJSON;
}

export default getLangs;
