import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { BsArrowRight } from "react-icons/bs";
import "./Register.css";
import registerImage from "../../../images/register.png";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/useToken";
import PageTitle from "../../../components/shared/PageTitle";
import Social from "../Social";
import Loading from "../../../components/Loading";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../components/reusableForm/Validation";
import Form from "../../../components/reusableForm/Form";
import Input from "../../../components/reusableForm/Input";
import TogglePassword from "../../../components/reusableForm/TogglePassword";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import GoogleReCAPTCHA from "../GoogleReCAPTCHA";
import ReusableModal from "../../../components/ReusableModal";
import { toast } from "react-toastify";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
  const [token] = useToken(user);
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const [recaptcha, setRecaptcha] = useState("");
  // modal
  const [showTermsModal, setShowTermsModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const handleRegister = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const image = data.imageURL;

    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name, photoURL: image });
      reset();
    } else {
      toast.error("Password did not match");
    }
  };

  // error
  let registerError = "";
  useEffect(() => {
    setRecaptcha("");
  }, [error, updateProfileError]);
  if (error || updateProfileError) {
    registerError = (
      <div>
        <p className="text-danger">
          {" "}
          {error?.message || updateProfileError.message}
        </p>
      </div>
    );
  }

  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }

  // loading
  if (loading || updating) {
    return <Loading />;
  }

  // google recaptcha
  const handleGoogleRECAPTCHA = (value) => {
    setRecaptcha(value);
  };

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Register" />
        <SectionTitle title="Register" />

        <div className="register-container">
          {/* image  */}
          <div
            className="register-image"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <img className="img-fluid" src={registerImage} alt="" />
          </div>

          {/* form  */}
          <div
            className="register"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <Form onSubmit={handleSubmit(handleRegister)}>
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

              {/* email */}
              <Input
                register={register("email")}
                name="email"
                type="email"
                placeholder="Email address"
                errors={errors}
              />

              {/* password */}
              <Input
                register={register("password")}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                errors={errors}
              />

              {/* confirm password */}
              <Input
                register={register("confirmPassword")}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                errors={errors}
                className="mb-1"
              />

              <TogglePassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {/* terms and conditions */}
              <div className="my-3">
                <input
                  onClick={() => setAgree(!agree)}
                  className="form-check-input"
                  name="terms"
                  id="terms"
                  type="checkbox"
                />

                <label
                  className={`ms-2 ${agree ? "text-dark" : "text-danger"}`}
                  htmlFor="terms"
                >
                  I accept the{" "}
                  <span
                    onClick={() => setShowTermsModal(true)}
                    style={{ cursor: "pointer" }}
                    className="text-decoration-underline text-primary"
                  >
                    terms and conditions
                  </span>
                </label>
              </div>

              {registerError}

              {/* google recaptcha  */}
              <GoogleReCAPTCHA onChange={handleGoogleRECAPTCHA} />

              <FormSubmit
                disabled={recaptcha && agree ? false : true}
                variant={recaptcha && agree ? "outline-dark" : "dark"}
              >
                Register
              </FormSubmit>

              <div>
                <p className="mt-3">
                  Already have an account?{" "}
                  <Link className="text-decoration-none" to="/login">
                    {" "}
                    Please Login <BsArrowRight />
                  </Link>
                </p>

                <div className="d-flex align-items-center">
                  <div style={{ height: "1px" }} className="bg-dark w-50" />
                  <p className="mt-2 px-2">Or</p>
                  <div style={{ height: "1px" }} className="bg-dark w-50" />
                </div>

                <div className="text-center">
                  <Social />
                </div>
              </div>
            </Form>
          </div>
        </div>

        {/* terms and conditions modal */}
        <ReusableModal
          size="lg"
          modalShow={showTermsModal}
          setModalShow={setShowTermsModal}
          modalTitle="Terms and Conditions"
          modalBody={
            <div>
              <ol data-aos="fade-down" data-aos-duration="1000">
                <li>
                  <span className="fw-bold">Booking Deposit and Payment: </span>
                  The Client shall make a booking fee as per the contract to
                  retain the Studio to perform the services specified in the
                  contract.
                </li>

                <li>
                  <span className="fw-bold">Cancellation: </span>If the Client
                  shall cancel this Agreement more than six (6) calendar days
                  before the photo shooting day, any booking fee paid to the
                  Photographer shall be refunded in full if the Photographer is
                  able to re-book the same date. If the Photographer is NOT able
                  to secure another client for the date, or if the cancellation
                  occurs less than six (6) calendar days before the portrait
                  date, the Client forfeits the booking fee.
                </li>

                <li>
                  <span className="fw-bold">
                    Photographic Materials and Copyright:{" "}
                  </span>
                  All photographic materials shall be the exclusive property of
                  the Photographer. The Photographer shall own the copyright in
                  all images created and may use the work for samples, contests,
                  exhibitions, advertising, and self-promotion. Usage outside
                  the bounds of this agreement will require the Client's
                  consent.
                </li>

                <li>
                  <span className="fw-bold">Client's Usage: </span>The Client is
                  obtaining prints for personal use only, and shall not sell
                  said prints or authorize any reproductions thereof by parties
                  other than the Photographer. If Client is obtaining a print
                  for reproduction, Photographer authorizes Client to reproduce
                  the print only as set forth under Special Usage Requirements.
                  In such event, Client shall request that a copyright and
                  credit notice for the Photographer be placed adjacent to the
                  photograph on publication but shall have no liability if the
                  publication refuses or omits to do so.
                </li>

                <li>
                  <span className="fw-bold">Social Media: </span>This clause
                  applies to all social media, including Facebook and blogs.
                  When published online it is required that a citation of the
                  photographer be made. The client agrees that they will under
                  no circumstances alter any photographs that are placed in
                  public on the internet. The client agrees to be responsible
                  for any family member or friend who posts our photographs
                  online and agrees that they cannot be cropped (with the
                  exception of the forced cropping for Facebook's Timeline),
                  altered in color, or edited in any way.
                </li>

                <li>
                  <span className="fw-bold">Failure to Perform: </span>If the
                  Photographer cannot perform this Agreement due to a fire or
                  other casualty, strike, or other cause beyond the control of
                  the parties, or due to the Photographer's illness, then the
                  Photographer shall return any funds previously paid to the
                  Client but shall have no further liability with respect to the
                  Agreement. This limitation on liability shall also apply in
                  the event that photographic materials are damaged in
                  processing, lost through camera malfunction, lost in the mail,
                  or otherwise lost or damaged without fault on the part of the
                  Photographer. In the event the Photographer fails to perform
                  for any other reason, the Photographer shall not be liable for
                  any amount in excess of the retail value of the Client's
                  order.
                </li>

                <li>
                  <span className="fw-bold">High-Resolution: </span>Images
                  deliverable in High-Resolution (or known as High-Res) are
                  300DPI with 3000 Pixels in the longest edge.
                </li>

                <li>
                  The Story Keeper keeps client files for up to 2 years after
                  the photography session and is not liable for any claims after
                  this period. All client files will be deleted and backups will
                  be purged after this period.
                </li>

                <li>
                  <span className="fw-bold">Liability: </span>It is client's
                  responsibility to take care of the children; The Story Keeper
                  will not accept any responsibility due to any accident to
                  children or damage to public or private properties during the
                  photo shooting or consultation session.
                </li>

                <li>
                  The client accepts that all photographs will be taken and
                  edited at the photographer's discretion based on the
                  photographer's experience and artistic view. If the client has
                  special requests shall create a “shot list” of all shots that
                  they require.
                </li>

                <li>
                  It is understood that the Photographer is not responsible for
                  fixing photos to cover parts of your body that you do not wish
                  to be seen in the photo unless it was confirmed with the
                  photographer in writing.
                </li>

                <li>
                  Photo Cooperation: In the event that the family/guests are
                  taking photos, The Story Keeper is not responsible for
                  obstructed photos or photos ruined due to separate flashes
                  going off or due to any other behavior from guests. The Story
                  Keeper is not responsible for obstructed or ruined photos due
                  to activities by other vendors and venue staff.
                </li>
              </ol>

              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-dark"
                  onClick={() => setShowTermsModal(false)}
                  className="me-2"
                >
                  Close
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </Container>
  );
};

export default Register;
