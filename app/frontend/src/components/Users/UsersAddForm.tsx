import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";
// import { useAppDispatch } from "../../store/hooks";
// import { register } from "../../store/user/userSlice";
// import { login } from "../../store/user/userSlice";
import { RegData } from "../../types/interfaces";
// import { setUsersState } from "../../store/users/usersSlice";
// import { SearchUsersDto } from "../../types/interfaces";

function UserAddForm() {
  const [regData, setRegData] = useState<RegData>({
    email: '',
    name: '',
    // contactPhone: '',
    password: '',
    role:''
  });
  const { authUser } = useFetchData();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // if (regData.email.length === 0) {
      //   iziToast.warning({
      //     message: 'Введите почту!',
      //     position: 'bottomCenter',
      //   });
      //   return;
      // }

      // if (regData.name.length === 0) {
      //   iziToast.warning({
      //     message: 'Введите имя!',
      //     position: 'bottomCenter',
      //   });
      //   return;
      // }

      if (regData.password.length < 6) {
        iziToast.warning({
          message: 'Пароль должен содержать 6 и более символов!',
          position: 'bottomCenter',
        });
        return;
      }

      // if (regData.name.length === 0) {
      //   iziToast.warning({
      //     message: 'Роль одна из: admin manager client',
      //     position: 'bottomCenter',
      //   });
      //   return;
      // }

      authUser.register(regData)
        .then(() => {
          // // register({ role: result.data.role, id: result.data.id });
          // // dispatch(login({ token: result.data.token, role: result.data.role, id: result.data.id }));
          // dispatch(register({ role: result.data.role, id: result.data.id }));
          iziToast.success({
            message: 'Вы успешно создали',
            position: 'bottomCenter',
          });     
          navigate('/users');

        })
        .catch(err => {    
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={regHandler}>
        <Form.Control type="email" className="mb-3" placeholder="Введите почту пользователя" onChange={(e) => setRegData({ ...regData, email: e.target.value })} required />
        <Form.Control type="text" className="mb-3" placeholder="Введите имя пользователя" onChange={(e) => setRegData({ ...regData, name: e.target.value })} required />
        <Form.Control type="tel" className="mb-3" placeholder="Введите телефон пользователя (необязательно)" onChange={(e) => setRegData({ ...regData, contactPhone: e.target.value })} />
        <Form.Control type="password" className="mb-3" placeholder="Введите пароль пользователя (не менне 6 символов)" onChange={(e) => setRegData({ ...regData, password: e.target.value })} required />
        <Form.Control type="text" className="mb-3" placeholder="Введите роль пользователя (admin, manager, client)" onChange={(e) => setRegData({ ...regData, role: e.target.value })} required />
      <Button variant="primary" type="submit">
        Создать
      </Button>
    </Form>
  )
}

export default UserAddForm


                /* <DropdownButton title="Выдать роль">
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'client')}>Клиент</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'manager')}>Менеджер</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(elem._id, 'admin')}>Админ</Dropdown.Item>
                </DropdownButton> */