import axios from 'axios';
import React from 'react';

function App() {
  const [loginText, setLoginText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');

  const handleClickLogin = () => {
    console.log('Clicked login');
  };

  return (
    <>
      <div className="container">
        <div className="window">
          <h2>Авторизация</h2>
          <form>
            <div className="window__row">
              <label htmlFor="login">Логин:</label>
              <input
                type="text"
                id="login"
                value={loginText}
                onChange={(e) => {
                  setLoginText(e.target.value);
                }}
              />
            </div>
            <div className="window__row">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={passwordText}
                onChange={(e) => {
                  setPasswordText(e.target.value);
                }}
              />
            </div>
            <button onClick={handleClickLogin}>Войти</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
