async function getFollowers(input) {
    const followers = await fetch(
        `https://api.github.com/users/${input}/followers`
    );
    const follwersJSON = await followers.json();
    // console.log(follwersJSON);
    // const following = await fetch(
    //     `https://api.github.com/users/${input}/following`
    // );
    // const followingJSON = await following.json();
    // console.log(followingJSON);

    return follwersJSON;
}

export default getFollowers;

//todo create two way link between friends, differeing colours
