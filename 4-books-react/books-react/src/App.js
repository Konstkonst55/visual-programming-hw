import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import BookCard from "./BookCard";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await axios.get("https://fakeapi.extendsclass.com/books");
        const booksData = booksResponse.data.slice(0, 15);
        const booksWithImages = await Promise.all(
          booksData.map(async (book) => {
            try {
              const googleResponse = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
              );
              const imageLink =
                googleResponse.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "";

              return { ...book, image: imageLink };
            } catch (error) {
              return { ...book, image: "" };
            }
          })
        );

        setBooks(booksWithImages);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Grid>
      {books.map((book) => (
        <BookCard key={book.id} title={book.title} authors={book.authors} imageBlob={book.image} />
      ))}
    </Grid>
  );
};

export default App;