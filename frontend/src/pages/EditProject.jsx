import React from 'react';
import axios from '../utils/axios';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const EditProject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const isNew = params.project_id == 'new' ? true : false;
  const projectId = params.project_id;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [image, setImage] = React.useState('/uploads/example.jpg');

  const handleClickSave = async (e) => {
    e.preventDefault();
    try {
      let res = {};
      if (isNew) {
        res = await axios.post('/projects/', {
          name,
          description,
          deadline,
          created_on: startDate,
          img: image,
        });
      } else {
        res = await axios.put(`/projects/${projectId}`, {
          name,
          description,
          deadline,
          created_on: startDate,
          img: image,
        });
      }
      navigate(`/project/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = async (e) => {
    try {
      if (!e.target.files[0]) return;
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      const { data } = await axios.post(`/projects/${projectId}/upload_image`, formData);
      setImage(data.image_path);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла');
    }
  };

  React.useEffect(() => {
    const getProjectData = async () => {
      try {
        const res = await axios.get(`/projects/${projectId}`);
        setName(res.data.project.name);
        setDescription(res.data.project.description);
        setStartDate(res.data.project.created_on);
        setDeadline(res.data.project.deadline);
        setImage(res.data.project.img);
      } catch (error) {
        console.log(error);
        alert('Произошла ошибка');
        navigate('/');
      }
    };

    if (!isNew) {
      getProjectData();
    }
  }, []);

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
            <img src={`http://localhost:8000${image}`} alt="Превью" />
            <input
              type="file"
              id="project_image"
              style={{ border: 'none' }}
              onChange={handleChangeFile}
            />
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
