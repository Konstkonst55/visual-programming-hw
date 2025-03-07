import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: #fff;
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const Authors = styled.p`
  font-size: 14px;
  color: gray;
`;

const BookCard = ({ title, authors, imageBlob }) => {
    const imageUrl = imageBlob instanceof Blob ? URL.createObjectURL(imageBlob) : imageBlob;

    return (
        <Card>
            {imageUrl ? (
                <BookImage src={imageUrl} alt={title} />
            ) : (
                <BookImage src="placeholder.jpg" alt="Placeholder" />
            )}
            <Title>{title}</Title>
            <Authors>{authors.join(", ")}</Authors>
        </Card>
    );
};

export default BookCard;