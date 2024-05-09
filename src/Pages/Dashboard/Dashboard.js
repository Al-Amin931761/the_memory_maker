import PageTitle from "../../components/shared/PageTitle";
import Container from "../../components/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import Sidebar from "../../components/shared/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <Container>
      <PageTitle title="Dashboard" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title="Dashboard" />
        </div>
      </div>

      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        data-aos="flip-up"
        data-aos-duration="2000"
      >
        <h2 className="second-font">Welcome to the Dashboard</h2>
      </div>
    </Container>
  );
};

export default Dashboard;
