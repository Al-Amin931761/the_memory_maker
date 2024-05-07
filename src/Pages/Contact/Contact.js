import "./Contact.css";
import image from "../../images/my-image.png";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import PageTitle from "../../components/shared/PageTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../../components/Container";
import Form from "../../components/reusableForm/Form";
import Input from "../../components/reusableForm/Input";
import Textarea from "../../components/reusableForm/Textarea";
import { contactSchema } from "../../components/reusableForm/Validation";
import FormSubmit from "../../components/reusableForm/FormSubmit";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const sendEmail = (data) => {
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        data,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Your message has been sent successfully");
        },
        (error) => {
          toast.error(`${error.text}`);
        }
      );
    reset();
  };

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Contact" />
        <h1 className="text-center fw-bold second-font mb-0">Contact</h1>
        <p className="text-center my-3">
          Please let me know how I can help. I look forward to working with you.
        </p>

        <div className="contact-container">
          {/* image */}
          <div
            className="d-flex justify-content-center"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <img className="img-fluid" src={image} alt="" />
          </div>

          <div
            className="contact-form d-flex flex-column justify-content-center"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <div>
              <h2 className="text-uppercase">Let's do this.</h2>
              <p>
                Please contact me at{" "}
                <a
                  className="text-decoration-none second-font"
                  href="tel:+8801741931761"
                >
                  +8801741931761
                </a>{" "}
                for whatever you need, OR think you need.
              </p>
              <p>
                OR Email me:{" "}
                <a
                  className="text-decoration-none second-font"
                  href="mailto:alamin931761@gmail.com"
                >
                  alamin931761@gmail.com
                </a>
              </p>
            </div>

            {/* contact form */}
            <Form onSubmit={handleSubmit(sendEmail)}>
              {/* name */}
              <Input
                register={register("user_name")}
                name="user_name"
                type="text"
                placeholder="Name"
                errors={errors}
              />

              {/* email */}
              <Input
                register={register("user_email")}
                name="user_email"
                type="email"
                placeholder="Your Email"
                errors={errors}
              />

              <Textarea
                register={register("message")}
                name="message"
                placeholder="Your Message"
                errors={errors}
              />

              <FormSubmit variant="outline-dark">Submit</FormSubmit>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
