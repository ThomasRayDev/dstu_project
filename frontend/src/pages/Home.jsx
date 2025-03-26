import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [username, setUsername] = React.useState('');

  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const res = await axios.get('/auth/current-user');
  //       setUsername(res.data.username);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       navigate('/login');
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  return (
    <div className="header">
      <div className="logo">
        <h2>Сильвестр</h2>
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

export default Home;
