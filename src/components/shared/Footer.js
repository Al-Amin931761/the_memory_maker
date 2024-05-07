import { FaRegCopyright, FaFacebook } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="text-center bg-dark text-light p-3">
      <p className="mt-3 mb-2">FOLLOW ME ON:</p>

      <a href="https://www.facebook.com/alamin931761/" target="_blank">
        <FaFacebook className="text-white" />
      </a>

      <a
        className="ms-3 me-3"
        href="https://twitter.com/AlAmin17401991"
        target="_blank"
      >
        <GrTwitter className="text-white" />
      </a>

      <a href="https://www.instagram.com/alamin931761/" target="_blank">
        <BsInstagram className="text-white" />
      </a>

      <p className="mt-2">
        <small>
          Copyrights <FaRegCopyright className="ms-2 me-2" /> {year} | The
          Memory Maker
        </small>
      </p>
    </footer>
  );
};

export default Footer;
