import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../redux/slices/userSlice';
import { fetchProjects, selectProjects } from '../redux/slices/projectsSlice';

import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects } = useSelector(selectProjects);
  const { user } = useSelector(selectUser);

  const listProjects = projects.map((obj, i) => (
    <tr key={i} onClick={() => navigate(`/project/${obj.id}`)}>
      <td className="project-column">{obj.name}</td>
      <td className="status-column">
        <div className="status">В процессе</div>
      </td>
      <td className="date-column">{obj.created_on}</td>
      <td className="date-column">{obj.deadline}</td>
      <td className="progress-column">
        <div className="progressbar">
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '30%',
              height: '100%',
              backgroundColor: 'green',
              borderRadius: '15px',
            }}></div>
        </div>
      </td>
      <td className="action-column">Обновить статус</td>
    </tr>
  ));

  React.useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h1>Все проекты</h1>
            {user.role === 'admin' ? (
              <div className="button" onClick={() => navigate('/edit/new')}>
                <span className="material-symbols-outlined">add</span>
              </div>
            ) : (
              ''
            )}
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
                <th className="progress-column">Прогресс</th>
                <th className="action-column"></th>
              </tr>
            </thead>
            <tbody>{listProjects}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
