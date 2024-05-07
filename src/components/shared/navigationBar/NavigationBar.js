import "./NavigationBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import useShoppingCart from "../../../hooks/useShoppingCart";
import useWishlist from "../../../hooks/useWishlist";

const NavigationBar = () => {
  const [user] = useAuthState(auth);
  const { myWishlistArray } = useWishlist();
  const { printQuantity } = useShoppingCart();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    signOut(auth);
  };

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className="d-flex align-items-center">
            <img width={40} src={logo} alt="" />
            <h4 className="ms-2">The Memory Maker</h4>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active" : "link-styles"
              }
            >
              Home
            </NavLink>

            <NavLink to="/packages" className="link-styles">
              Packages
            </NavLink>

            <NavLink to="/prints" className="link-styles">
              Prints
            </NavLink>

            {user && (
              <NavLink to="/dashboard" className="link-styles">
                Dashboard
              </NavLink>
            )}

            <NavLink to="/contact" className="link-styles">
              Contact
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/about" className="link-styles">
              About
            </NavLink>

            <NavLink to="/FAQ" className="link-styles">
              FAQ
            </NavLink>

            {user ? (
              <span className="logout-button" onClick={handleLogOut}>
                Log Out
              </span>
            ) : (
              <NavLink to="/login" className="link-styles">
                Login
              </NavLink>
            )}

            <NavLink
              to="/myWishlist"
              className="link-styles cart-and-wishlist-icon"
            >
              <AiOutlineHeart className="fs-3 pb-1" />
              <span className="quantity">
                {myWishlistArray.length ? myWishlistArray.length : "0"}
              </span>
            </NavLink>

            <NavLink to="/cart" className="link-styles cart-and-wishlist-icon">
              <GiShoppingCart className="fs-3 pb-1" />
              <span className="quantity">{printQuantity}</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
