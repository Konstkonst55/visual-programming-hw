const { loadData } = require("./load-data");
const { calcStats } = require("./calc-stats");

async function calcStatsFromAPI() {
    const catsInfo = await loadData();
    return calcStats(catsInfo);
}

module.exports = { calcStatsFromAPI };