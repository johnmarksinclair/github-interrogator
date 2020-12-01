export default async function getRateLimit() {
    let data = await fetch("https://api.github.com/rate_limit");
    let dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON.rate.remaining;
}
