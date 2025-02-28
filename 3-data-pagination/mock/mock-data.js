const mockCatData = [
    {
        breed: "Turkish Van",
        country: "developed in the United Kingdom (founding stock from Turkey)",
        origin: "Natural",
        coat: "Semi-long",
        pattern: "Van"
    },
    {
        breed: "York Chocolate",
        country: "United States (New York)",
        origin: "Natural",
        coat: "Long",
        pattern: "Solid"
    }
];

const expectedStats = {
    "developed in the United Kingdom (founding stock from Turkey)": 1,
    "United States (New York)": 1
};

module.exports = { mockCatData, expectedStats };
