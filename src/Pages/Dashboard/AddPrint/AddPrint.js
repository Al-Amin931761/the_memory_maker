import Sidebar from "../../../components/shared/Sidebar/Sidebar";
import photo from "../../../images/add-photo.png";
import "./AddPrint.css";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import PageTitle from "../../../components/shared/PageTitle";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import Form from "../../../components/reusableForm/Form";
import Input from "../../../components/reusableForm/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import { addAndUpdatePrintSchema } from "../../../components/reusableForm/Validation";

const AddPrint = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addAndUpdatePrintSchema) });

  const handleAddPrint = (data) => {
    const printData = {
      name: data.name,
      image: data.imageURL,
      location: data.location,
    };

    fetch("https://the-memory-maker-server.vercel.app/addPrint", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(printData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success("Print added successfully");
        } else {
          toast.error("Print was not successfully added");
        }
      });
    reset();
  };

  return (
    <Container>
      <PageTitle title="Add Print" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title="Add Print" />
        </div>
      </div>

      <div className="add-print-container">
        <div
          className="w-100"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <img className="img-fluid" src={photo} alt="" />
        </div>

        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <Form onSubmit={handleSubmit(handleAddPrint)}>
            {/* name */}
            <Input
              register={register("name")}
              name="name"
              type="text"
              placeholder="Name"
              errors={errors}
            />

            {/* image url */}
            <Input
              register={register("imageURL")}
              name="imageURL"
              type="text"
              placeholder="Image URL"
              errors={errors}
            />

            {/* location */}
            <Input
              register={register("location")}
              name="location"
              type="location"
              placeholder="Location"
              errors={errors}
            />

            <FormSubmit variant="outline-dark">Add Print</FormSubmit>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AddPrint;
