import React from 'react';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [popupState, setPopupState] = React.useState(false);

  const popupRef = React.useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('access_token');
    navigate('/login');
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !event.composedPath().includes(popupRef.current)) {
        setPopupState(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        <div ref={popupRef} className="avatar" onClick={() => setPopupState(!popupState)}>
          {popupState ? (
            <div className="popup">
              <div className="exit" onClick={handleLogout}>
                Выйти
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
