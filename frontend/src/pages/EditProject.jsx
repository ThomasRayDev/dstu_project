import React from 'react';
import axios from '../utils/axios';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const EditProject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const isNew = params.project_id == 'new' ? true : false;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [deadline, setDeadline] = React.useState('');

  const handleClickSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/projects/', {
        name,
        description,
        deadline,
      });
      // navigate(`/project/${res.data.id}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="wrapper axax">
          {isNew ? <h2>Создать проект</h2> : <h2>Редактировать проект</h2>}
          <form className="edit-form">
            <label htmlFor="project_title">Название проекта: </label>
            <input
              type="text"
              id="project_title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="project_description">Описание проекта:</label>
            <textarea
              id="project_description"
              spellCheck="false"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
            <label htmlFor="project_image">Изображение проекта:</label>
            <img src="/img/example.jpg" alt="Превью" />
            <input type="file" id="project_image" style={{ border: 'none' }} />
            <label htmlFor="project_start">Дата начала:</label>
            <input
              type="date"
              id="project_start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="project_deadline">Планируемая дата завершения:</label>
            <input
              type="date"
              id="project_deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <div className="edit-buttons">
              <button onClick={handleClickSave}>Сохранить</button>
              <button className="delete">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProject;
