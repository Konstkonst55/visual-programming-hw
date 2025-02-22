const orderBy = require("../script/order-by");

describe("Функция orderBy", () => {
    test("Корректная сортировка по одному полю", () => {
        const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
        const result = orderBy(data, ["name"]);

        expect(result).toEqual([
            { name: "Alice" },
            { name: "Bob" },
            { name: "Charlie" }
        ]);
    });

    test("Корректная сортировка по двум полям", () => {
        const data = [
            { name: "Alice", age: 30 },
            { name: "Alice", age: 25 },
            { name: "Bob", age: 20 }
        ];

        const result = orderBy(data, ["name", "age"]);

        expect(result).toEqual([
            { name: "Alice", age: 25 },
            { name: "Alice", age: 30 },
            { name: "Bob", age: 20 }
        ]);
    });

    test("Исключение при передаче не массива", () => {
        expect(() => orderBy("not an array", ["name"])).toThrow("Первый аргумент должен быть массивом.");
    });

    test("Исключение при передаче массива не из объектов", () => {
        expect(() => orderBy([1, 2, 3], ["name"])).toThrow("Все элементы массива должны быть объектами.");
    });

    test("Исключение при отсутствии ключа в объекте", () => {
        const data = [{ name: "Alice" }, { age: 30 }];

        expect(() => orderBy(data, ["name"])).toThrow('Свойство "name" отсутствует в одном из объектов.');
    });
});