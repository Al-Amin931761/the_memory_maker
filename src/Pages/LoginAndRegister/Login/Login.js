import { useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../../images/login.png";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/useToken";
import PageTitle from "../../../components/shared/PageTitle";
import Loading from "../../../components/Loading";
import Container from "../../../components/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  resetPasswordSchema,
} from "../../../components/reusableForm/Validation";
import SectionTitle from "../../../components/shared/SectionTitle";
import Form from "../../../components/reusableForm/Form";
import Input from "../../../components/reusableForm/Input";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import TogglePassword from "../../../components/reusableForm/TogglePassword";
import GoogleReCAPTCHA from "../GoogleReCAPTCHA";
import { BsArrowRight } from "react-icons/bs";
import ReusableModal from "../../../components/ReusableModal";
import { toast } from "react-toastify";
import Social from "../Social";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [token] = useToken(user);
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const [recaptcha, setRecaptcha] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  // login
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  // reset password
  const {
    register: resetPasswordRegister,
    handleSubmit: resetPasswordHandleSubmit,
    reset: resetPasswordReset,
    formState: { errors: resetPasswordErrors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  // google recaptcha
  const handleGoogleRECAPTCHA = (value) => {
    setRecaptcha(value);
  };

  // handle login
  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;
    signInWithEmailAndPassword(email, password);
    reset();
  };

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  // login error
  useEffect(() => {
    setRecaptcha("");
  }, [error]);

  let loginError = "";
  if (error) {
    loginError = <p className="text-danger"> {error.message}</p>;
  }

  // reset password
  const handleResetPassword = async (data) => {
    const email = data.resetPasswordEmail;
    if (email) {
      await sendPasswordResetEmail(email);
      toast.info("An email has been sent to reset your password");
      resetPasswordReset();
      setShowResetPasswordModal(false);
    }
  };

  // loading
  if (loading || sending) {
    return <Loading />;
  }

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Login" />
        <SectionTitle title="Login" />
        <div className="login-container">
          {/* image  */}
          <div
            className="login-image"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <img className="img-fluid" src={loginImage} alt="" />
          </div>

          <div
            className="login"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            {/* form  */}
            <Form onSubmit={handleSubmit(handleLogin)}>
              {/* email */}
              <Input
                register={register("email")}
                name="email"
                type="text"
                placeholder="Email address"
                errors={errors}
              />

              {/* password */}
              <Input
                register={register("password")}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                errors={errors}
                className="mb-1"
              />
              <TogglePassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              {loginError}

              {/* google ReCAPTCHA */}
              <GoogleReCAPTCHA onChange={handleGoogleRECAPTCHA} />

              <FormSubmit
                disabled={!recaptcha}
                variant={!recaptcha ? "dark" : "outline-dark"}
              >
                Login
              </FormSubmit>
            </Form>

            <p className="mt-3">
              New to The Memory Maker?{" "}
              <Link className="text-decoration-none" to="/register">
                {" "}
                Please Register <BsArrowRight />
              </Link>
            </p>
            <p>
              Forget Password?{" "}
              <span
                onClick={() => setShowResetPasswordModal(true)}
                className="text-primary"
                style={{ cursor: "pointer" }}
              >
                Reset Password <BsArrowRight />
              </span>
            </p>

            <div className="d-flex align-items-center">
              <div style={{ height: "1px" }} className="bg-dark w-50"></div>
              <p className="mt-2 px-2">Or</p>
              <div style={{ height: "1px" }} className="bg-dark w-50"></div>
            </div>

            <div className="text-center">
              <Social />
            </div>
          </div>
        </div>
      </div>

      {/* reset password modal */}
      <ReusableModal
        modalShow={showResetPasswordModal}
        setModalShow={setShowResetPasswordModal}
        modalTitle="Reset Password"
        modalBody={
          <Form onSubmit={resetPasswordHandleSubmit(handleResetPassword)}>
            <Input
              register={resetPasswordRegister("resetPasswordEmail")}
              name="resetPasswordEmail"
              type="text"
              placeholder="Email address"
              errors={resetPasswordErrors}
            />
            <FormSubmit variant="outline-dark">Reset Password</FormSubmit>
          </Form>
        }
      />
    </Container>
  );
};

export default Login;
