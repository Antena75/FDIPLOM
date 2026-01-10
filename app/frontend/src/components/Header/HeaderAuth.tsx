// import { useState } from "react";
import { Container } from "react-bootstrap";
// import { useAuth } from "../../hooks/useAuth";
import FormAuth from "./FormAuth";
// import FormRegister from "./FormRegister";
// import HeaderProfile from "./HeaderProfile";

function HeaderAuth() {
  // const isAuth = useAuth();
  // const [authForm, setAuthForm] = useState(true);
  // const [authFor, setAuthFor] = useState(true);

  return (
    <Container>
      <FormAuth />
    </Container>
  )
}

export default HeaderAuth
