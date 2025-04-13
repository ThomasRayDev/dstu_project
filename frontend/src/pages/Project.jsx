import React from 'react';

import Header from '../components/Header';

const Project = () => {
  return (
    <>
      <Header />
      <div className="project-container">
        <div className="left-content">
          <div className="general-info">
            <img src="img/example.jpg" alt="картинка" height="400" width="600" />
            <h2>Детская площадка</h2>
            <div className="description">
              Проект строительства детской площадки предусматривает создание безопасного
              и&nbsp;современного пространства для детей возрастом
              от&nbsp;3&nbsp;до&nbsp;12&nbsp;лет. Площадка будет включать игровые элементы (качели,
              горки, песочницу), зону отдыха с&nbsp;лавочками и&nbsp;озеленение. Общая площадь
              составит 200&nbsp;м&sup2;, а&nbsp;материалы выбраны с&nbsp;учетом экологичности
              и&nbsp;долговечности. Реализация проекта улучшит инфраструктуру района
              и&nbsp;обеспечит детям место для активного отдыха.
            </div>
            <div className="project-actions">
              <div className="project-action">
                <span className="material-symbols-outlined">edit</span>
                Редактировать
              </div>
              <div className="project-action delete">
                <span className="material-symbols-outlined">delete</span>
                Удалить
              </div>
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
