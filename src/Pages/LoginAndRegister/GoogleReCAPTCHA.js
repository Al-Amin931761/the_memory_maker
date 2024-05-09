import ReCAPTCHA from "react-google-recaptcha";

const GoogleReCAPTCHA = ({ onChange }) => {
  return (
    <ReCAPTCHA
      className="mb-3"
      sitekey={process.env.REACT_APP_google_recaptcha_sitekey}
      onChange={onChange}
    />
  );
};

export default GoogleReCAPTCHA;
