import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setUserToState } from "../store/user.slice";
import styled from "styled-components"

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W]).{8,}$/;

const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, "Does your password meet the requirements?")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

// * styled components
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`
const StyledWrapper = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`

const StyledError = styled(ErrorMessage) `
  color: red;
  font: 0.8rem;
`

const StyledButton = styled.button `
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  // handle login
  
  // = https://server-ruddy.vercel.app/api/auth/login
  
  const handleLogin = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post("https://server-setup-express.vercel.app/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      console.log(response.data);
      dispatch(setUserToState(response.data.user, response.data.token));
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setError(error.response.data.message);
        return;
      }

      if (error.response.status === 400) {
        setError(error.response.data.message);
        return;
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <h3>Login to continue</h3>
      {error && <div>{error}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={async (values) => {
          await handleLogin(values);
        }}>
        <StyledForm>
          <StyledWrapper>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
            />
            <StyledError
              name="email"
              component="p"
            />
          </StyledWrapper>
          <StyledWrapper>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
            />
            <StyledError
              name="password"
              component="p"
            />
          </StyledWrapper>
          <StyledButton disabled={loading} type="submit">{loading ? "working on it..." : "login"}</StyledButton>
        </StyledForm>
      </Formik>
    </div>
  );
};

export default LoginForm;
