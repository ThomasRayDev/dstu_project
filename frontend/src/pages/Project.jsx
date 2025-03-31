import React from 'react';

import Header from '../components/Header';

const Project = () => {
  return (
    <>
      <Header />
      <div className="project-container">
        <div className="left-content">
          <img src="img/example.jpg" alt="картинка" height="400" width="600" />
          <h2>Детская площадка</h2>
          <div className="description">
            Проект строительства детской площадки предусматривает создание безопасного
            и&nbsp;современного пространства для детей возрастом от&nbsp;3&nbsp;до&nbsp;12&nbsp;лет.
            Площадка будет включать игровые элементы (качели, горки, песочницу), зону отдыха
            с&nbsp;лавочками и&nbsp;озеленение. Общая площадь составит 200&nbsp;м&sup2;,
            а&nbsp;материалы выбраны с&nbsp;учетом экологичности и&nbsp;долговечности. Реализация
            проекта улучшит инфраструктуру района и&nbsp;обеспечит детям место для активного отдыха.
          </div>
          <div className="project-actions">
            <div className="project-action">
              <span class="material-symbols-outlined">edit</span>
              Редактировать
            </div>
            <div className="project-action delete">
              <span class="material-symbols-outlined">delete</span>
              Удалить
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="tasks">
            <h2>Задачи</h2>
            <div className="task">
              <h3>Установить горки</h3>
              <div className="assignee">Ответственный: Иванов И. И.</div>
              <div className="progress">Прогресс: 2/3</div>
              <div className="task-status">
                Статус:
                <div className="status">В процессе</div>
              </div>
              <div className="task-actions">
                <div className="task-action complete">
                  <span class="material-symbols-outlined">check</span>
                  Выполнить
                </div>
                <div className="task-action">
                  <span class="material-symbols-outlined">comment</span>
                  Комментарии
                </div>
                <div className="task-action delete">
                  <span class="material-symbols-outlined">delete</span>
                  Удалить
                </div>
              </div>
            </div>
            <div className="task">
              <h3>Провести свет</h3>
              <div className="assignee">Ответственный: Иванов И. И.</div>
              <div className="progress">Прогресс: 1/5</div>
              <div className="task-status">
                Статус:
                <div className="status">На уточнении</div>
              </div>
              <div className="task-actions">
                <div className="task-action complete">
                  <span class="material-symbols-outlined">check</span>
                  Выполнить
                </div>
                <div className="task-action">
                  <span class="material-symbols-outlined">comment</span>
                  Комментарии
                </div>
                <div className="task-action delete">
                  <span class="material-symbols-outlined">delete</span>
                  Удалить
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
