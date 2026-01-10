import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../store/hooks";

function MenuMain() {
  const role = useAppSelector(state => state.user.role);
  const userId = useAppSelector(state => state.user.id);
  const isAuth = useAuth();

  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/">
          Поиск гостиницы
        </NavLink>
      </ListGroup.Item>
      {isAuth === true &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/requests">
            Обращения
          </NavLink>
        </ListGroup.Item>
      }
      {role === 'admin' &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/all-hotels">
            Создать гостиницу
          </NavLink>
        </ListGroup.Item>
      }
      {(role === 'admin' || role === 'manager') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users/search">
            Поиск Пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {(role === 'admin') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users">
            Создать Пользователя
          </NavLink>
        </ListGroup.Item>
      }
      {isAuth === true && (role === 'client') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to={`/reservations?id=${userId}`}>
            Мои брони
          </NavLink>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default MenuMain
