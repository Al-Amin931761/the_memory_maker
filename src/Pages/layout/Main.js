import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer";
import NavigationBar from "../../components/shared/navigationBar/NavigationBar";

const Main = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
