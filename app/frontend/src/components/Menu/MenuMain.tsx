import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../store/hooks";

function MenuMain() {
  const role = useAppSelector(state => state.user.role);
  const userId = useAppSelector(state => state.user.id);
  const isAuth = useAppSelector(state => state.user.isAuth);

  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/">
          Поиск библиотеки (книги)
        </NavLink>
      </ListGroup.Item>
      {isAuth === true && role === 'admin' &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/all-libraries">
            Добавить библиотеку (книгу)
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && (role === 'admin' || role === 'manager') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users/search">
            Поиск пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && role === 'admin' &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users">
            Добавить пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && role === 'client' &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to={`/rentals?id=${userId}`}>
            Мои книги
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && (role === 'client' || role === 'manager') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/requests">
            Обращения в поддержку
          </NavLink>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default MenuMain
