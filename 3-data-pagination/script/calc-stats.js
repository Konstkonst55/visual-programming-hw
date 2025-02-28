function calcStats(catsInfo) {
    return catsInfo.reduce((acc, cat) => {
        const country = cat.country;
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});
}

module.exports = { calcStats };