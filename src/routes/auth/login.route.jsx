import LoginForm from "../../components/login.form.component";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const Login = () => {
  return (
    <StyledContainer>
      <LoginForm />
    </StyledContainer>
  );
};

export default Login;
