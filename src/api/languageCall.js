async function getLangs(username, repoName) {
    const languages = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    const languagesJSON = await languages.json();
    var langArr = [];
    var valueArr = [];
    Object.keys(languagesJSON).forEach(function (key) {
        var lang = {
            language: key,
            value: languagesJSON[key],
        };
        langArr.push(lang);
        valueArr.push(languagesJSON[key]);
        //console.log(key);
        //console.log(languagesJSON[key]);
    });
    console.log(languages);
    console.log(languagesJSON);
    console.log(langArr);
    console.log(valueArr);
    return langArr;
}

export default getLangs;
