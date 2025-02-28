const fetch = require("node-fetch");

async function loadData() {
    const baseUrl = "https://catfact.ninja/breeds";
    let allData = [];
    let url = baseUrl;

    while (url) {
        const response = await fetch(url);
        const json = await response.json();
        allData = allData.concat(json.data);
        url = json.next_page_url;
    }

    return allData;
}

module.exports = { loadData };