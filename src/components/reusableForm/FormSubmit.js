import { Button } from "react-bootstrap";

const FormSubmit = ({ children, disabled = false, variant }) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      variant={variant}
      className="text-capitalize"
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
