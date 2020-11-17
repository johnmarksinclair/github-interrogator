async function api(input) {
    const data = await fetch(`https://api.github.com/users/${input}`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON;
}

export default api;

/* 
get list of supplied users repos,
add to list
iterate over list getting language info from each
add to totals 
display info
*/
