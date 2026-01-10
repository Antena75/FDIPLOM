// import { useEffect } from "react";
import { Container, Button, Stack } from "react-bootstrap";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { setUsersState } from "../../store/users/usersSlice";
import UsersList from "./UsersList";
// import UsersCreateForm from "./UsersCreateForm";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";

function Users() {
  // const dispatch = useAppDispatch();
  // const usersState = useAppSelector(state => state.users);

  // useEffect(() => {
  //   if (usersState.limit !== -1 || usersState.offset !== 0 || usersState.email.length !== 0 || usersState.name.length !== 0 || usersState.contactPhone.length !== 0) {
  //     dispatch(setUsersState({ offset: 0, email: '', name: '', contactPhone: '' }));
  //   }
  // }, []);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <Stack direction="horizontal" gap={2}>
        <p className="fs-2 fw-semibold">Все пользователи</p>
            <Link to={'/users/add'} className="ms-auto">
                <Button variant="success">Добавить Пользователя</Button>
            </Link>
        </Stack>
      </Container>
      <UsersList />
    </Container>
  )
}

export default Users