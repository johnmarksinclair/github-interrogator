async function getFollowers(input) {
    const data = await fetch(`https://api.github.com/users/${input}/followers`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    // TODO iterate through each and add "login" to list of followers to return
    return dataJSON;
}

export default getFollowers;
