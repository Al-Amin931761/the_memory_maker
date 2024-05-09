import { Table } from "react-bootstrap";
import usePrints from "../../../hooks/usePrints";
import PageTitle from "../../../components/shared/PageTitle";
import Sidebar from "../../../components/shared/Sidebar/Sidebar";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import ManagePrint from "./ManagePrint";

const ManagePrints = () => {
  const { allPrint } = usePrints();

  return (
    <Container>
      <PageTitle title="Manage Prints" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title={`Manage Prints (${allPrint.length})`} />
        </div>
      </div>

      <div data-aos="fade-down" data-aos-duration="2000">
        <Table responsive bordered hover className="mb-0">
          <thead>
            <tr>
              <th></th>
              <th className="table-head item">Image</th>
              <th className="table-head text-center">Name</th>
              <th className="table-head text-center">Location</th>
              <th className="table-head text-center">Edit</th>
              <th className="table-head text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allPrint.map((data, index) => (
              <ManagePrint key={data._id} data={data} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ManagePrints;
