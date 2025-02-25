import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <h1>Сильвестр</h1>
        <div className="profile">
          <div className="profile__name">Игорь</div>
          <a href="">Выйти</a>
        </div>
      </div>

      <h2>Проекты</h2>
      <div className="wrapper">
        <div className="projects">
          <div className="project">
            <div className="project__picture"></div>
            <div className="project__data">
              <div className="project__body">
                <h3 className="project__title">Новый проект</h3>
                <div className="project__description">
                  Описание нового проекта. Кстати, очень удачный проект!
                </div>
              </div>
              <div className="project__footer">
                <button>Перейти</button>
                <button>Удалить</button>
              </div>
            </div>
          </div>
          <div className="project">
            <div className="project__picture"></div>
            <div className="project__data">
              <div className="project__body">
                <h3 className="project__title">Новый проект</h3>
                <div className="project__description">
                  Описание нового проекта. Кстати, очень удачный проект!
                </div>
              </div>
              <div className="project__footer">
                <button>Перейти</button>
                <button>Удалить</button>
              </div>
            </div>
          </div>
          <div className="project">
            <div className="project__picture"></div>
            <div className="project__data">
              <div className="project__body">
                <h3 className="project__title">Новый проект</h3>
                <div className="project__description">
                  Описание нового проекта. Кстати, очень удачный проект!
                </div>
              </div>
              <div className="project__footer">
                <button>Перейти</button>
                <button>Удалить</button>
              </div>
            </div>
          </div>
          <div className="project">
            <div className="project__picture"></div>
            <div className="project__data">
              <div className="project__body">
                <h3 className="project__title">Новый проект</h3>
                <div className="project__description">
                  Описание нового проекта. Кстати, очень удачный проект!
                </div>
              </div>
              <div className="project__footer">
                <button>Перейти</button>
                <button>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
