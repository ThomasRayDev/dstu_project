import React from 'react';

import axios from '../utils/axios';

const Login = () => {
  const [loginText, setLoginText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', {
        username: loginText,
        password: passwordText,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="window">
        <h2>Авторизация</h2>
        <form onSubmit={handleClickLogin}>
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
          <button>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
