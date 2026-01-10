import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { setUsersState } from "../../store/users/usersSlice";
import { SearchUsersDto } from "../../types/interfaces";

function UsersSearchForm() {
  const [limit, setLimit] = useState<number>(-1);
  const [offset, setOffset] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const dispatch = useAppDispatch();

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const searchData: Partial<SearchUsersDto> = {
        limit,
        offset,
        email,
        name,
        contactPhone,
      };

      dispatch(setUsersState(searchData));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={searchHandler}>
      <Form.Control type="text" className="mb-3" placeholder="Введите количество пользователей (необязательно)" onChange={(e) => setLimit(Number(e.target.value))} />
      <Form.Control type="text" className="mb-3" placeholder="Введите сдвиг списка пользователей (необязательно)" onChange={(e) => setOffset(Number(e.target.value))} />
      <Form.Control type="text" className="mb-3" placeholder="Введите почту пользователя (можно частично)" onChange={(e) => setEmail(e.target.value)} />
      <Form.Control type="text" className="mb-3" placeholder="Введите имя пользователя (можно частично)" onChange={(e) => setName(e.target.value)} />
      <Form.Control type="tel" className="mb-3" placeholder="Введите телефон пользователя (можно частично)" onChange={(e) => setContactPhone(e.target.value)} />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default UsersSearchForm
