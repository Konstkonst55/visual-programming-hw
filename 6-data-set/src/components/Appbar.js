import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Appbar.css';

const Appbar = () => {
    return (
        <nav className="appbar">
            <NavLink to="/comments">Комментарии</NavLink>
            <NavLink to="/posts">Посты</NavLink>
            <NavLink to="/albums">Альбомы</NavLink>
            <NavLink to="/todos">Задачи</NavLink>
            <NavLink to="/users">Пользователи</NavLink>
        </nav>
    );
};

export default Appbar;