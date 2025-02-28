const loadDataModule = require("../script/load-data");
jest.spyOn(loadDataModule, "loadData").mockResolvedValue(require("../mock/mock-data").mockCatData);

const { calcStatsFromAPI } = require("../script/calc-stats-from-api");
const { expectedStats } = require("../mock/mock-data");

test("calcStatsFromAPI should return correct statistics", async () => {
    const result = await calcStatsFromAPI();

    expect(loadDataModule.loadData).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedStats);
});