import { useEffect, useRef, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import { BsArrowRight } from "react-icons/bs";
import "./Login.css";
import { toast } from "react-toastify";
import Social from "../Social/Social";
import ReCAPTCHA from "react-google-recaptcha";
import loginImage from "../../../images/login.png";
import { BiSolidLogIn } from "react-icons/bi";
import useToken from "../../../hooks/useToken";
import PageTitle from "../../../components/shared/PageTitle";
import Loading from "../../../components/Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [token] = useToken(user);
  const [showPassword, setShowPassword] = useState(false);
  const [googleRecaptchaSitekey, setGoogleRecaptchaSitekey] = useState("");

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleLogin = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
    event.target.reset();
  };

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  let loginError = "";
  if (error) {
    loginError = <p className="text-danger"> {error.message}</p>;
  }

  if (loading) {
    return <Loading />;
  }

  // reset password
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast.info("An email has been sent to reset your password");
    } else {
      toast.error("Please enter your email address");
    }
  };

  if (sending) {
    return <Loading />;
  }

  // google recaptcha
  const googleRecaptcha = (value) => {
    setGoogleRecaptchaSitekey(value);
  };

  return (
    <div className="common-styles" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Login" />
      <div>
        <h1 className="text-center fw-bold second-font mb-3">Login</h1>

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

          {/* form  */}
          <div
            className="login"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  ref={emailRef}
                  type="email"
                  className="form-control"
                  id="email-address"
                  placeholder="Email Address"
                  required
                />
                <label htmlFor="email-address">Email address</label>
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* toggle */}
                <div className="mt-1">
                  <input
                    onClick={() => setShowPassword(!showPassword)}
                    className="form-check-input"
                    name="toggle"
                    id="toggle"
                    type="checkbox"
                  />
                  <label
                    htmlFor="toggle"
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    <small>
                      {showPassword ? (
                        <span>Hide Password</span>
                      ) : (
                        <span>Show Password</span>
                      )}
                    </small>
                  </label>
                </div>
              </div>

              {loginError}

              {/* google recaptcha  */}
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_google_recaptcha_sitekey}
                onChange={googleRecaptcha}
              />

              <button
                className={`mt-3 ${
                  !googleRecaptchaSitekey
                    ? "btn btn-dark"
                    : "btn btn-outline-dark"
                }`}
                disabled={!googleRecaptchaSitekey}
                type="submit"
              >
                Login <BiSolidLogIn className="icon" />
              </button>
            </form>
            <p className="mt-3">
              New to The Memory Maker?{" "}
              <Link className="text-decoration-none" to="/register">
                {" "}
                Please Register <BsArrowRight />
              </Link>
            </p>
            <p>
              Forget Password?{" "}
              <span onClick={resetPassword} className="text-primary">
                Reset Password <BsArrowRight />
              </span>
            </p>

            <div className="d-flex align-items-center">
              <div style={{ height: "1px" }} className="bg-dark w-50"></div>
              <p className="mt-2 px-2">Or</p>
              <div style={{ height: "1px" }} className="bg-dark w-50"></div>
            </div>

            <div className="text-center">
              <Social></Social>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
