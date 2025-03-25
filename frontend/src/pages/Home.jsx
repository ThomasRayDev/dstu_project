import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [username, setUsername] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('/auth/current-user');
        setUsername(res.data.username);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="home">
      <div className="header">
        <h1>Сильвестр</h1>
        {isLoading ? (
          ''
        ) : (
          <div className="profile">
            <div className="profile__name">{username}</div>
            <Link to="/login" onClick={() => window.localStorage.removeItem('access_token')}>
              Выйти
            </Link>
          </div>
        )}
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
