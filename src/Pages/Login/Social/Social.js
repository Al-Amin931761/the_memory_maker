import { useEffect } from "react";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsFacebook } from "react-icons/bs";
import useToken from "../../../hooks/useToken";
import Loading from "../../../components/Loading";

const Social = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const [token] = useToken(googleUser || githubUser || facebookUser);

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
  if (googleError || githubError || facebookError) {
    errorElement = (
      <p className="text-danger my-3 text-center">
        {googleError?.message || githubError?.message}
      </p>
    );
  }

  // loading
  if (googleLoading || githubLoading || facebookLoading) {
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
      <Button onClick={() => signInWithFacebook()} variant="outline-dark">
        <BsFacebook className="fs-2" /> Continue with Facebook
      </Button>
      {errorElement}
    </div>
  );
};

export default Social;
