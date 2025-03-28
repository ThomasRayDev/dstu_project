import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../components/Header';

import axios from '../utils/axios';

const Home = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = React.useState([]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('/auth/current-user');
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects/');
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCurrentUser();
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h1>Все проекты</h1>
            <div className="button">
              <span className="material-symbols-outlined">add</span>
            </div>
          </div>
          <ul className="statuses">
            <li>Все</li>
            <li>Активные</li>
            <li>В процессе</li>
            <li>Просроченные</li>
          </ul>
          <table>
            <thead>
              <tr>
                <th className="project-column">Проект</th>
                <th className="status-column">Статус</th>
                <th className="date-column">Начало</th>
                <th className="date-column">Окончание</th>
                <th className="action-column"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="project-column">Складское помещение</td>
                <td className="status-column">
                  <div className="status">В процессе</div>
                </td>
                <td className="date-column">15.03.2022</td>
                <td className="date-column">15.05.2022</td>
                <td className="action-column">Обновить статус</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
