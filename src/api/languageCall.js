async function getLangs(username, repoName) {
    const languages = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    const languagesJSON = await languages.json();
    // var langArr = [];
    // Object.keys(languagesJSON).forEach(function (key) {
    //     var lang = {
    //         language: key,
    //         value: languagesJSON[key],
    //     };
    //     langArr.push(lang);
    //     //console.log(key);
    //     //console.log(languagesJSON[key]);
    // });
    //console.log(languages);
    //console.log(languagesJSON);
    //console.log(langArr);

    return languagesJSON;

    // var keys = Object.keys(langArr[0]);
    // console.log(keys);
    // console.log(langArr[0].value);

    // var languageArray = [];
    // var valueArray = [];

    // for (var i = 0; i < langArr.length; i++) {
    //     languageArray.push(langArr[i].language);
    //     valueArray.push(langArr[i].value);
    // }

    // console.log(languageArray);
    // console.log(valueArray);

    // return valueArray;

    // const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
    // var header = Object.keys(langArr[0]);
    // let csv = langArr.map((row) =>
    //     header
    //         .map((fieldName) => JSON.stringify(row[fieldName], replacer))
    //         .join(",")
    // );
    // csv.unshift(header.join(","));
    // csv = csv.join("\r\n");

    // console.log(csv);
    // console.log(csv.language);

    // return csv;
}

export default getLangs;
