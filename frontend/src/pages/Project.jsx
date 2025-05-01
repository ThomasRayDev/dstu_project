import React from 'react';
import axios from '../utils/axios';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();

  const projectId = params.project_id;

  const [projectData, setProjectData] = React.useState({});
  const [tasks, setTasks] = React.useState([]);
  const [modalState, setModalState] = React.useState(true);

  const listTasks = tasks.map((obj, i) => (
    <div className="task" key={i}>
      <div className="task-row">
        <h3>{obj.title}</h3>
        <div className="task-more">
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
      </div>
      <div className="statuses">
        <div className="status" style={{ backgroundColor: '#fae4b2' }}>
          {obj.status}
        </div>
      </div>
      <div className="task-info">
        <div className="task-row">
          <span className="material-symbols-outlined">calendar_today</span>
          {obj.created_on}
        </div>
        <div className="task-row">
          <span className="material-symbols-outlined">comment</span>5
        </div>
      </div>
    </div>
  ));

  console.log(tasks);

  React.useEffect(() => {
    // setProjectData(projects.filter((project) => project.id == projectId)[0]);
    const getProjectData = async () => {
      try {
        const res = await axios.get(`/projects/${projectId}`);
        setProjectData(res.data.project);
      } catch (error) {
        console.log(error);
        alert('Произошла ошибка');
        navigate('/');
      }
    };

    const getTasks = async () => {
      try {
        const res = await axios.get(`/projects/${projectId}/tasks`);
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
        alert('Ошибка загрузки задач');
      }
    };

    getProjectData();
    getTasks();
  }, []);

  const handleDeleteProject = async () => {
    if (window.confirm('Вы действительно хотите удалить проект?')) {
      try {
        await axios.delete(`/projects/${projectId}`);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {modalState && (
        <div className="modal-layout">
          <div className="modal">
            <div className="modal-header">
              <h2>Задача</h2>X
            </div>
            <div className="modal-content">
              <div className="modal-block">
                <div className="form-col">
                  <label htmlFor="task-title">Название задачи:</label>
                  <input type="text" id="task-title" />
                </div>
                <div className="form-col">
                  <label htmlFor="task-description">Описание задачи:</label>
                  <textarea id="task-description"></textarea>
                </div>
                <div className="task-progress-block">
                  <div className="form-row">
                    <label htmlFor="task-progress">Прогресс:</label>
                    <input type="number" id="task-progress" className="task-progress" />
                  </div>
                  <div className="form-row">
                    <label htmlFor="task-target">Цель:</label>
                    <input type="number" id="task-target" className="task-progress" />
                  </div>
                </div>
                <div className="buttons">
                  <button>Сохранить</button>
                  <button className="delete">Удалить</button>
                </div>
              </div>
              <div className="modal-block">
                <h3>Комментарии</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="project-container">
        <div className="left-content">
          <div className="general-info">
            <img
              src={`http://localhost:8000${projectData.img}`}
              alt="картинка"
              height="400"
              width="600"
            />
            <h2>{projectData.name}</h2>
            <div className="description">{projectData.description}</div>
            <div className="project-actions">
              <button onClick={() => navigate(`/edit/${projectId}`)}>
                <span className="material-symbols-outlined">edit</span>
                Редактировать
              </button>
              <button className="delete" onClick={handleDeleteProject}>
                <span className="material-symbols-outlined">delete</span>
                Удалить
              </button>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="tasks">
            <h2>Задачи</h2>
            {listTasks}
            <div className="task create-new">Создать задачу</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
