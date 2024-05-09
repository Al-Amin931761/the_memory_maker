import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAndUpdatePrintSchema } from "../../../components/reusableForm/Validation";
import ReusableModal from "../../../components/ReusableModal";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import Input from "../../../components/reusableForm/Input";
import Form from "../../../components/reusableForm/Form";

const ManagePrint = ({ data, index }) => {
  const { name, image, location, _id } = data;
  const [printId, setPrintId] = useState("");
  const navigate = useNavigate("");
  // update modal
  const [showPrintUpdateModal, setShowPrintUpdateModal] = useState(false);
  // delete modal
  const [showPrintDeleteModal, setShowPrintDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addAndUpdatePrintSchema) });

  // update button
  const handleUpdateButton = (id) => {
    setShowPrintUpdateModal(true);
    setPrintId(id);
  };

  // update print
  const handleUpdatePrint = (data) => {
    const updatedPrint = {
      image: data.imageURL,
      name: data.name,
      location: data.location,
    };

    fetch(`https://the-memory-maker-server.vercel.app/allPrint/${printId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedPrint),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Print data has been successfully edited");
        } else {
          toast.error(`Print data was not edited successfully`);
        }
      });
    reset();
    setShowPrintUpdateModal(false);
  };

  // delete button
  const handleDeleteButton = (id) => {
    setShowPrintDeleteModal(true);
    setPrintId(id);
  };

  // delete print
  const handleDeletePrint = () => {
    fetch(`https://the-memory-maker-server.vercel.app/allPrint/${printId}`, {
      method: "DELETE",
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
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${name} has been successfully deleted`);
        }
      });
  };

  return (
    <>
      <tr>
        <td className="text-center px-4">{index + 1}</td>
        <td className="text-center px-4">
          <img
            style={{ height: "70px", width: "100px" }}
            className="img-fluid"
            src={image}
            alt={name}
          />
        </td>
        <td className="text-center px-4">{name}</td>
        <td className="text-center px-4">{location}</td>
        <td className="text-center px-4">
          <button
            onClick={() => handleUpdateButton(_id)}
            className="btn btn-outline-dark"
          >
            <BiSolidEdit className="fs-3" />
          </button>
        </td>
        <td className="text-center px-4">
          <button
            onClick={() => handleDeleteButton(_id)}
            className="btn btn-outline-danger"
          >
            <AiFillDelete className="fs-3" />
          </button>
        </td>
      </tr>

      {/* update modal */}
      <ReusableModal
        size="lg"
        modalShow={showPrintUpdateModal}
        setModalShow={setShowPrintUpdateModal}
        modalTitle={name}
        modalBody={
          <Form onSubmit={handleSubmit(handleUpdatePrint)}>
            {/* image */}
            <Input
              register={register("imageURL")}
              name="imageURL"
              type="text"
              placeholder="Image URL"
              errors={errors}
            />

            {/* name */}
            <Input
              register={register("name")}
              name="name"
              type="text"
              placeholder="Name"
              errors={errors}
            />

            <Input
              register={register("location")}
              name="location"
              type="text"
              placeholder="Location"
              errors={errors}
            />

            <FormSubmit variant="outline-dark">Update</FormSubmit>
          </Form>
        }
      />

      {/* delete modal */}
      <ReusableModal
        modalShow={showPrintDeleteModal}
        setModalShow={setShowPrintDeleteModal}
        modalTitle={name}
        modalBody={
          <div>
            <p>
              Are you sure to delete{" "}
              <span className="text-danger second-font">{name}</span>?
            </p>

            <div className="d-flex justify-content-end">
              <Button
                variant="outline-dark"
                onClick={() => setShowPrintDeleteModal(false)}
                className="me-2"
              >
                Close
              </Button>
              <Button variant="outline-danger" onClick={handleDeletePrint}>
                Delete
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ManagePrint;
