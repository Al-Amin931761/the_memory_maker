import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LinkButton = ({ variant, icon, to, name, leftIcon = false }) => {
  return (
    <Link to={to}>
      <Button variant={variant} className="text-capitalize second-font">
        {leftIcon ? (
          <span>
            {icon} {name}
          </span>
        ) : (
          <span>
            {name} {icon}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default LinkButton;
