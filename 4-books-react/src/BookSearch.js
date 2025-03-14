
import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const BookSearch = ({ books, onSearch }) => {
    const [query, setQuery] = useState("");
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        const filteredBooks = books.filter(
            (book) =>
                book.title.toLowerCase().includes(searchQuery) ||
                book.authors.some((author) => author.toLowerCase().includes(searchQuery))
        );

        sortBooks(filteredBooks, sortField, sortOrder);
    };

    const handleSortChange = (e) => {
        const field = e.target.value;
        setSortField(field);
        sortBooks(books, field, sortOrder);
    };

    const handleOrderChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        sortBooks(books, sortField, order);
    };

    const sortBooks = (bookList, field, order) => {
        const sortedBooks = [...bookList].sort((a, b) => {
            if (a[field] < b[field]) return order === "asc" ? -1 : 1;
            if (a[field] > b[field]) return order === "asc" ? 1 : -1;
            return 0;
        });

        onSearch(sortedBooks);
    };

    return (
        <SearchContainer>
            <Input
                type="text"
                placeholder="Поиск по названию или автору..."
                value={query}
                onChange={handleSearch}
            />
            <SelectContainer>
                <Select value={sortField} onChange={handleSortChange}>
                    <option value="title">Название</option>
                    <option value="authors">Автор</option>
                </Select>
                <Select value={sortOrder} onChange={handleOrderChange}>
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </Select>
            </SelectContainer>
        </SearchContainer>
    );
};

export default BookSearch;
