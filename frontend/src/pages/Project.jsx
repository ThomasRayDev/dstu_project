import React from 'react';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';

import { setErrorWithTimeout } from '../redux/slices/errorSlice';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectId = params.project_id;

  const [projectData, setProjectData] = React.useState({});
  const [tasks, setTasks] = React.useState([]);
  const [modalState, setModalState] = React.useState(false);

  const [isNewTask, setIsNewTask] = React.useState(true);
  const [taskId, setTaskId] = React.useState();
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDeadline, setTaskDeadline] = React.useState();
  const [taskComments, setTaskComments] = React.useState([]);
  const [taskProgress, setTaskProgress] = React.useState('');
  const [taskTarget, setTaskTarget] = React.useState('');

  const [commentText, setCommentText] = React.useState('');

  const listTasks = tasks.map((obj, i) => (
    <div
      className="task"
      key={i}
      onClick={() => {
        setModalState(true);
        fetchTask(obj.id);
      }}>
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

  const listTaskComments = taskComments.map((obj, i) => {
    const date = new Date(obj.created_on + 'Z');
    const formattedDate = date.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="comment" key={i}>
        <div className="comment-info">
          <div className="avatar"></div>
          <div className="form-col">
            <div className="comment-author">{obj.user.username}</div>
            <div className="comment-date">{formattedDate}</div>
          </div>
        </div>
        <p>{obj.text}</p>
        <div className="comment-actions">
          <a href="#">Изменить</a>
          <a onClick={() => deleteComment(obj.id)}>Удалить</a>
        </div>
      </div>
    );
  });

  const fetchTask = async (tId) => {
    try {
      const res = await axios.get(`/projects/${projectId}/tasks/${tId}`);
      const taskData = res.data;
      setIsNewTask(false);
      setTaskTitle(taskData.title);
      setTaskDescription(taskData.description);
      setTaskDeadline(taskData.deadline.split('T')[0]);
      setTaskId(tId);
      setTaskComments(taskData.comments);
    } catch (error) {
      dispatch(setErrorWithTimeout(error.message, 5000));
    }
  };

  const addComment = async () => {
    try {
      const res = await axios.post(`/projects/${projectId}/tasks/${taskId}/comments`, {
        text: commentText,
      });
      console.log(res);
      fetchTask(taskId);
      setCommentText('');
    } catch (error) {
      dispatch(setErrorWithTimeout(error.message, 5000));
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
      );
      console.log(res);
      fetchTask(taskId);
    } catch (error) {
      dispatch(setErrorWithTimeout(error.message));
    }
  };

  const saveTask = async () => {
    try {
      if (!taskDescription || !taskTitle || !taskDeadline) {
        return dispatch(setErrorWithTimeout('Не заполнены обязательные параметры'));
      }
      const res = await (isNewTask
        ? axios.post(`/projects/${projectId}/tasks`, {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
          })
        : axios.put(`/projects/${projectId}/tasks/${taskId}`, {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
          }));
      setTaskId(res.data.task.id);
      setIsNewTask(false);
      getTasks();
    } catch (error) {
      dispatch(setErrorWithTimeout(error.message));
    }
  };

  const deleteTask = async () => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      try {
        const res = await axios.delete(`/projects/${projectId}/tasks/${taskId}`);
        setModalState(false);
        getTasks();
      } catch (error) {
        dispatch(setErrorWithTimeout(error.message));
      }
    }
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(`/projects/${projectId}/tasks`);
      setTasks(res.data.tasks);
    } catch (error) {
      dispatch(setErrorWithTimeout(error.message, 5000));
    }
  };

  React.useEffect(() => {
    const getProjectData = async () => {
      try {
        const res = await axios.get(`/projects/${projectId}`);
        setProjectData(res.data.project);
      } catch (error) {
        dispatch(setErrorWithTimeout(error.message, 5000));
        navigate('/');
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
        dispatch(setErrorWithTimeout(error.message, 5000));
      }
    }
  };

  return (
    <>
      {modalState && (
        <div className="modal-layout">
          <div className="modal">
            <div className="modal-header">
              <h2>Задача</h2>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setModalState(false);
                  setCommentText('');
                }}>
                close
              </span>
            </div>
            <div className="modal-content">
              <div className="modal-block">
                <div className="form-col">
                  <label htmlFor="task-title">Название задачи:</label>
                  <input
                    type="text"
                    id="task-title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
                <div className="form-col">
                  <label htmlFor="task-description">Описание задачи:</label>
                  <textarea
                    id="task-description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                </div>
                <div className="task-progress-block">
                  <div className="form-row">
                    <label htmlFor="task-progress">Прогресс:</label>
                    <input
                      type="number"
                      id="task-progress"
                      className="task-progress"
                      value={taskProgress}
                      onChange={(e) => setTaskProgress(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="task-target">Цель:</label>
                    <input
                      type="number"
                      id="task-target"
                      className="task-progress"
                      value={taskTarget}
                      onChange={(e) => setTaskTarget(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-col">
                  <label htmlFor="task-deadline">Закончить до:</label>
                  <input
                    type="date"
                    id="task-deadline"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                  />
                </div>
                <div className="buttons">
                  <button onClick={saveTask}>Сохранить</button>
                  <button className="delete" onClick={deleteTask}>
                    Удалить
                  </button>
                </div>
              </div>
              <div className="modal-block">
                <h3>Комментарии</h3>
                <div className="task-comments">{listTaskComments}</div>
                {!isNewTask && (
                  <div className="task-comments-new">
                    <input
                      type="text"
                      placeholder="Добавить комментарий..."
                      className="comment-new"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={addComment}>Добавить</button>
                  </div>
                )}
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
            <div
              className="task create-new"
              onClick={() => {
                setModalState(true);
                setIsNewTask(true);
                setTaskTitle();
                setTaskDescription();
                setTaskDeadline();
                setTaskComments([]);
              }}>
              Создать задачу
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
