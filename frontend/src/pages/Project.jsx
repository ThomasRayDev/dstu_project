import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectProjects } from '../redux/slices/projectsSlice';

import Header from '../components/Header';

const Project = () => {
  const params = useParams();
  const { projects } = useSelector(selectProjects);

  const [projectData, setProjectData] = React.useState({});

  React.useEffect(() => {
    setProjectData(projects.filter((project) => project.id == params.project_id)[0]);
  }, []);

  return (
    <>
      <Header />
      <div className="project-container">
        <div className="left-content">
          <div className="general-info">
            <img src="../img/example.jpg" alt="картинка" height="400" width="600" />
            <h2>{projectData.name}</h2>
            <div className="description">{projectData.description}</div>
            <div className="project-actions">
              <button>
                <span className="material-symbols-outlined">edit</span>
                Редактировать
              </button>
              <button className="delete">
                <span className="material-symbols-outlined">delete</span>
                Удалить
              </button>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="tasks">
            <h2>Задачи</h2>
            <div className="task">
              <div className="task-row">
                <h3>Положить плитку</h3>
                <div className="task-more">
                  <span className="material-symbols-outlined">more_horiz</span>
                </div>
              </div>
              <div className="statuses">
                <div className="status" style={{ backgroundColor: '#fab2b2' }}>
                  Низкий
                </div>
                <div className="status" style={{ backgroundColor: '#fae4b2' }}>
                  В процессе
                </div>
              </div>
              <div className="task-info">
                <div className="task-row">
                  <span className="material-symbols-outlined">calendar_today</span>
                  11 апр. 2025
                </div>
                <div className="task-row">
                  <span className="material-symbols-outlined">comment</span>5
                </div>
              </div>
            </div>
            <div className="task">
              <div className="task-row">
                <h3>Положить плитку</h3>
                <div className="task-more">
                  <span className="material-symbols-outlined">more_horiz</span>
                </div>
              </div>
              <div className="statuses">
                <div className="status" style={{ backgroundColor: '#fab2b2' }}>
                  Низкий
                </div>
                <div className="status" style={{ backgroundColor: '#fae4b2' }}>
                  В процессе
                </div>
              </div>
              <div className="task-info">
                <div className="task-row">
                  <span className="material-symbols-outlined">calendar_today</span>
                  11 апр. 2025
                </div>
                <div className="task-row">
                  <span className="material-symbols-outlined">comment</span>5
                </div>
              </div>
            </div>
            <div className="task create-new">Создать задачу</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
