//const axios = require("axios");

async function getRepos(input) {
    // axios
    //     .get(`https://api.github.com/users/${input}/repos`)
    //     .then(async function (res) {
    //         const repoJSON = await res.data.json();
    //         console.log(repoJSON);
    //         // return repoJSON;
    //     });

    const data = await fetch(`https://api.github.com/users/${input}/repos`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON;
}

export default getRepos;
