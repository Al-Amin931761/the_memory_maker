import { useEffect } from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../../components/Loading";

const Social = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [token] = useToken(googleUser || githubUser);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  // error
  let errorElement = "";
  if (googleError || githubError) {
    errorElement = (
      <p className="text-danger my-3 text-center">
        {googleError?.message || githubError?.message}
      </p>
    );
  }

  // loading
  if (googleLoading || githubLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Button onClick={() => signInWithGoogle()} variant="outline-dark">
        <FcGoogle className="fs-2" /> Continue with Google
      </Button>{" "}
      <br />
      <Button
        className="my-3"
        onClick={() => signInWithGithub()}
        variant="outline-dark"
      >
        <BsGithub className="fs-2" /> Continue with Github
      </Button>{" "}
      <br />
      {errorElement}
    </div>
  );
};

export default Social;
