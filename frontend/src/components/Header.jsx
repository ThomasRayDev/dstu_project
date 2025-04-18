import React from 'react';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">
        <h2 onClick={() => navigate('/')}>Сильвестр</h2>
      </div>
      <div className="header-right">
        <ul className="nav">
          <li>Проекты</li>
          <li>Задачи</li>
          <li>Файлы</li>
        </ul>
        <ul className="buttons">
          <li>
            <span className="material-symbols-outlined">language</span>
          </li>
          <li>
            <span className="material-symbols-outlined">notifications</span>
          </li>
        </ul>
        <div className="avatar"></div>
      </div>
    </div>
  );
};

export default Header;
