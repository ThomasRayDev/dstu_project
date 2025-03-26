import React from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../utils/axios';

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        username: login,
        password: password,
      });
      localStorage.setItem('access_token', res.data.access_token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="login-window">
        <h2>Авторизация</h2>
        <form onSubmit={handleClickLogin}>
          <div className="login-window__row">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </div>
          <div className="login-window__row">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
