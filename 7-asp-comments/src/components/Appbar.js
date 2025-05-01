import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Appbar.css';

const Appbar = () => {
    return (
        <nav className="appbar">
            <NavLink to="/comments">Комментарии</NavLink>
            <NavLink to="/logs">Логи</NavLink>
        </nav>
    );
};

export default Appbar;