function orderBy(arr, keys) {
    if (!Array.isArray(arr)) {
        throw new Error("Первый аргумент должен быть массивом.");
    }

    for (const item of arr) {
        if (typeof item !== "object" || item === null) {
            throw new Error("Все элементы массива должны быть объектами.");
        }

        for (const key of keys) {
            if (!(key in item)) {
                throw new Error(`Свойство "${key}" отсутствует в одном из объектов.`);
            }
        }
    }

    return [...arr].sort((a, b) => {
        for (const key of keys) {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
        }

        return 0;
    });
}

module.exports = orderBy;
