async function getFollowers(input) {
    const followers = await fetch(
        `https://api.github.com/users/${input}/followers`
    );
    const follwersJSON = await followers.json();

    return follwersJSON;
}

export default getFollowers;
