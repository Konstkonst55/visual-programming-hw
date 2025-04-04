# Домашнее задание №1. Grid и Flexbox
> [1-wisp-the-cat-landing](./1-wisp-the-cat-landing/)

Выполните вёрстку html страницы согласно [`макету`](https://pixso.net/app/editor/sbUwn5I8g4nNJ4e-4q7D6A?icon_type=1&page-id=0%3A1)

По ссылке находятся дизайны двух макетов — версия для мониторов и версия для мобильных устройств

Вёрстка должна удовлетворять следующим условиям:
- Использование семантических тегов
- Разбиение страницы выполнить при помощи `grid`
- Каждый элемент `grid`'а стилизовать при помощи `flexbox`
- Header и footer имеют фиксированную высоту и растянуты по всей ширине экрана
- Основная часть страницы должна тянуться
- Мобильная и настольная версия страниц должны совпадать с их макетами по внешнему виду
- Изображения и шрифты можно брать из макета
- Для мобильной версии следует показывать сжатые версии исходных изображений

# Домашнее задание №2. JavaScript, Jest
> [2-js-order-by](./2-js-order-by/)

Реализовать функцию `orderBy`, которая принимает массив произвольных объектов и массив названий свойств (в строковом представлении). Функция должна возвращать отсортированную копию исходного массива (исходный массив не должен изменяться) по свойствам, которые передаются во втором массиве. Например, если передаётся в качестве свойств массив:

```js
["name", "age"]
```

То первичным ключом для сортировки является свойство `name`, если у двух сравниваемых объектов `name` одинаковые, то сравнивать объекты по `age`.

Проверить, что в первом массиве передаются объекты типа `object`, если нет, то выбросить исключение (оператор `throw`). Если при сравнении объектов хотя бы у одного отсутствует свойство по которому выполняется сравнение, выбросить исключение (Для проверки наличия свойства в объекте можно использовать оператор `in`).

Функцию оформить в отдельный **модуль**.

Выполните модульное тестирование функции при помощи тестового фреймворка `Jest`. Выполните тестирование ситуации с корректными входными данными (проверьте, что возвращаемое значение соответствует ожидаемому). Выполните тестирование случаев, которые выбрасывают исключения (когда в качестве сортируемого массива передаётся не массив из элементов типа `object` и когда не во всех элементах присутствуют свойства по которым выполняется сортировка).

# Домашнее задание №3. Сетевые запросы, промисы и мок-функции
> [3-data-pagination](./3-data-pagination/)

Реализовать функции для считывания данных о породах кошек и вычисления статистики на основе этих
данных. Для этого выполнить следующие шаги:

Прочитать про функцию `fetch` при помощи которой делаются запросы к серверу.

Реализовать в отдельном модуле функцию `async loadData()` которая возвращает массив
состоящий из элементов поля `data` (схема данных выше) со всех страниц начиная с адреса
[`https://catfact.ninja/breeds`](https://catfact.ninja/breeds).

Реализовать в отдельном модуле функцию `calcStats(catsInfo)`, которая вычисляет статистику
по полю `country`. `catsInfo` — массив из объектов со схемой

```json
{
 "breed": string,
 "country": string,
 "origin": string,
 "coat": string,
 "pattern": string
}
```

Реализовать в отдельном модуле функцию `async calcStatsFromAPI()`, которая загружает
данные с удалённого сервера при помощи функции `loadData`, передаёт данные в
`calcStats(catsInfo)` и возвращает результат работы этой функции.

Выполнить тестирование функции `async calcStatsFromAPI()` при помощи фреймворка `Jest`.

# Домашнее задание №4. Компоненты React

> [4-books-react](./4-books-react/)

Создать компонент `React` `BookCard` в которой отображается информация о книге (сверху вниз — обложка, название, авторы). Шрифт названия должен быть больше чем у шрифта авторов.

Данные в карточку должны приходить через пропсы. Изображение должно приходить в виде набора байт (`BLOB`).

Реализовать демонстрационное приложение на `React`. Приложение получает данные о книгах по API
[`https://fakeapi.extendsclass.com/books`](https://fakeapi.extendsclass.com/books). `JSON` схема ответа:

```json
[
 {
 "id": numeric,
 "title": string,
 "isbn": string,
 "pageCount": numeric,
 "authors": [string]
 },
 ...
]
```

API не предоставляет изображение обложек книг. Их можно получить по `API` [`https://www.googleapis.com/books/v1/volumes`](https://www.googleapis.com/books/v1/volumes). Для получения изображения требуется в `URL` запроса добавить параметр `q` — по какому критерию выполнять поиск. Например, запрос на поиск по `isbn` (уникальный идентификатор издания  книги) книги `Specification by Example` будет выглядеть так: [`https://www.googleapis.com/books/v1/volumes?q=isbn:1617290084`](https://www.googleapis.com/books/v1/volumes?q=isbn:1617290084). Ссылку на картинку можно получить из ответа следующим образом:

``` js
items[0].volumeInfo.imageLinks.thumbnail
```

Приложение должно расположить карточки книг горизонтально, если карточкам не хватает места, то оставшиеся переносятся на следующие строки.

# Домашнее задание №5. Передача данных между компонентами

> [4-books-react / src / BookSearch.js](./4-books-react/src/BookSearch.js)

В главный компонент `App` из прошлого домашнего задания добавить поиск по названию книги и автору — при вводе в текстовое поле результат поиска должен отображаться в виде набора `BookCard`.

Поиск должен производиться в реальном времени при наборе строки поиска. Реализовать сортировку (реализовать выбор по чему сортировать — название или автор и тип сортировки — по возрастанию и убыванию). Выделить решение в отдельный компонент (должно получиться три компонента — `App`, `BookCard` и новый компонент `BookSearch`). 

# Домашнее задание №6. Жизненный цикл компонентов

> [5-weather-app](./5-weather-app/)

Реализовать приложение для просмотра прогноза погоды на несколько дней вперёд. Для получения данных использовать сервис `OpenWeather` — есть бесплатные тарифы, но нужно зарегистрироваться и получить API-ключ, привязывать карту и т.д. при регистрации ненужно (ссылка на API [`https://openweathermap.org/forecast5`](https://openweathermap.org/forecast5) API-ключ после регистрации начнёт работать не ранее чем через несколько минут, задержка возможна до нескольких часов). Сделать обновление погоды в приложении каждые три часа. Добавить выбор города (`Geocoding API`, где можно узнать широту и долготу [`https://openweathermap.org/api/geocodingapi`](https://openweathermap.org/api/geocodingapi)).

Внешний вид приложения должен визуально соответствовать, отображаемой погоде. Это можно сделать добавив погодные иконки, которые визуально отображают особенности погодных условий (солнечно, дождь, сильный ветер и т.д.); изменяя цвет фона приложения. 

Иконки можно получать через `OpenWeather` — идентификатор иконки, которая отражает текущую погоду находится в одном из полей ответа. Как запрашивать иконки по идентификатору можно посмотреть тут [`https://openweathermap.org/weather-conditions`](https://openweathermap.org/weather-conditions). 

У бесплатного тарифа есть ограничение на количество запросов в день, поэтому рекомендуется тестировать приложение на фиксированных предварительно скачанных данных. При реализации приложения обязательно сделать разбиение на компоненты. 

# Домашнее задание №7. Render props

> [6-data-set](./6-data-set/)

Создать универсальный компонент `DataSet`, который представляет собой плоскую таблицу со строками и столбцами. Шапка таблицы — заголовки столбцов передаются через пропсы в виде массива объектов (если массив заголовков не передаётся, то заголовки берутся из названий свойств, отображаемых объектов); также через пропсы передаётся массив объектов, который будет отображаться в таблице — в каждой строке один элемент из массива; правила отображение каждого элемента массива и элемента массива заголовков передаётся через рендер пропсы. Часть строки с левого края должна представлять собой область при нажатии левой кнопки мыши на которую вся строка должна выделяться, если ранее были выделены други строки, то они сбрасывают выделение; если зажата клавиша `Ctrl`, то при выделении новой строки, выделенные ранее строки остаются выделенными; при попытке выделения уже выделенной строки, выделение убирается.

# Домашнее задание №8

Реализовать приложение для работы с табличными данными типа `Comments`. При запуске приложения данные скачиваются с [`https://jsonplaceholder.typicode.com/comments`](https://jsonplaceholder.typicode.com/comments) и отображаются при помощи компонента `DataSet`, выполненного в предыдущей домашней работе. Приложение должно поддерживать добавление нового элемента в таблицу (при добавлении элемента должен отправляться `POST` запрос на сервер с добавленными данными; реализовать оптимистичную стратегию выполнения операции — добавить в приложении новые данные не дожидаясь ответа от сервера, но если сервер вернул ошибку, то откатить изменения, для реализации стратегии можно использовать хук `useOptimistic`), удаление выделенных элементов (должен отправляться `DELETE` запрос на сервер с удаляемыми данными), модификация существующих объектов (должен отправляться `PATCH` запрос на сервер с модифицированными данными). Примеры запросов при помощи функции `fetch` можно найти тут [`https://jsonplaceholder.typicode.com/guide/`](https://jsonplaceholder.typicode.com/guide/)