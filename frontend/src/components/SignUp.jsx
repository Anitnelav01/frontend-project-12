import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import signUpImg from "../assets/signup.jpg";
import { useAuthContext } from "../contexts/index.jsx";
import routes from '../routes';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const SignUp = () => {
  const { logIn } = useAuthContext();
  const navigate = useNavigate();
  const [signUpFail, setSignUpFail] = useState(false);
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required("Обязательное поле")
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов"),
      password: Yup.string()
        .trim()
        .required("Обязательное поле")
        .min(6, "от 6 до 20 символов")
        .max(20, "от 6 до 20 символов"),
      confirmPassword: Yup.string()
        .trim()
        .required("Обязательное поле")
        .oneOf([Yup.ref("password"), null], "Пароль должен совпадать"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        logIn(data);
        navigate(routes.chatPagePath(), { replace: true });
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          setSignUpFail(true);
          inputRef.current.select();
          return;
        }
        console.error(error);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  className="rounded-circle"
                  src={signUpImg}
                  alt="Регистрация"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Имя пользователя"
                    isInvalid={
                      (formik.errors.username && formik.touched.username) ||
                      signUpFail
                    }
                    ref={inputRef}
                    required
                    autoFocus
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      (formik.errors.password && formik.touched.password) ||
                      signUpFail
                    }
                    placeholder="Пароль"
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      (formik.errors.confirmPassword &&
                        formik.touched.repeatPassword) ||
                      signUpFail
                    }
                    placeholder="Подтвердите пароль"
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">
                    Подтвердите пароль
                  </Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                    placement="right"
                  >
                    {signUpFail ? 'Такой пользователь уже существует' : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;