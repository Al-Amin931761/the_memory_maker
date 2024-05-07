import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const RequireOwner = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user?.email === "alamin931761@gmail.com") {
    return children;
  } else {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireOwner;
