async function getFollowers(input) {
    const data = await fetch(`https://api.github.com/users/${input}/followers`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON;
}

export default getFollowers;
