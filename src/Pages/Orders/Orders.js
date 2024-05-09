import { useEffect, useState } from "react";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Table } from "react-bootstrap";
import PageTitle from "../../components/shared/PageTitle";
import Sidebar from "../../components/shared/Sidebar/Sidebar";
import Container from "../../components/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate("");
  useEffect(() => {
    fetch(`https://the-memory-maker-server.vercel.app/orders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [navigate, orders]);

  return (
    <Container>
      <PageTitle title="Orders" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title={`Orders (${orders?.length})`} />
        </div>
      </div>

      <div data-aos="fade-down" data-aos-duration="2000">
        <Table responsive bordered hover className="mb-0">
          <thead>
            <tr>
              <th></th>
              <th className="table-head item">Name</th>
              <th className="table-head text-center">Email</th>
              <th className="table-head text-center">Phone Number</th>
              <th className="table-head text-center">Country</th>
              <th className="table-head text-center">Address</th>
              <th className="table-head text-center">State</th>
              <th className="table-head text-center">City</th>
              <th className="table-head text-center text-nowrap">
                Postal Code
              </th>
              <th className="table-head text-center text-nowrap">
                Date (MM-DD-YYYY)
              </th>
              <th className="table-head text-center">Time</th>
              <th className="table-head text-center">Amount</th>
              <th className="table-head text-center">Transaction ID</th>
              <th className="table-head text-center">Orders</th>
              <th className="table-head text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data, index) => (
              <Order key={data._id} data={data} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Orders;
