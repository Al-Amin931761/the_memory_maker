import { useEffect, useState } from "react";
import "./Packages.css";
import { FaCamera } from "react-icons/fa";
import PageTitle from "../../components/shared/PageTitle";
import SectionTitle from "../../components/shared/SectionTitle";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Package from "./Package/Package";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("https://the-memory-maker-server.vercel.app/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

  if (packages.length === 0) {
    return <Loading />;
  }

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Packages" />

        <SectionTitle
          title={`Packages (${packages.length})`}
          icon={<FaCamera className="mb-2" />}
        />

        <div className="packages">
          {packages.map((data) => (
            <Package key={data._id} data={data} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Packages;
