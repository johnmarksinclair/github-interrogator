function api(args) {
    const testCall = async () => {
        const data = await fetch(`https://api.github.com/users/${args}`);
        const dataJSON = await data.json();
        console.log(dataJSON);
    };
    testCall();
}

export default api;
