import React from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// Types
interface NavbarProps {
  // Add props here when needed
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white main-navbar sticky-top border-bottom">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100" style={{height: '4rem'}}>
          {/* Logo */}
          <div className="d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <ShoppingBag className="me-2 text-primary" style={{width: '2.5rem', height: '2.5rem'}} />
              <span className="fs-3 fw-bold text-dark">ShopHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex flex-grow-1 justify-content-center">
            <div className="d-flex align-items-baseline gap-4">
              <Link to="/" className="nav-link text-dark nav-hover">
                Home
              </Link>
              <a href="#products" className="nav-link text-secondary nav-hover">
                Products
              </a>
              <Link to="/about" className="nav-link text-secondary nav-hover">
                About
              </Link>
              <Link to="/contact" className="nav-link text-secondary nav-hover">
                Contact
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <button className="btn btn-link text-secondary px-3">
              Login
            </button>
            <button className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm">
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="d-md-none">
            <button
              onClick={toggleMenu}
              className="btn btn-link text-secondary p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="d-md-none">
            <div className="p-3 bg-white border-top">
              <a href="#home" className="nav-link text-dark">
                Home
              </a>
              <a href="#products" className="nav-link text-secondary">
                Products
              </a>
              <Link to="/about" className="nav-link text-secondary">
                About
              </Link>
              <Link to="/contact" className="nav-link text-secondary">
                Contact
              </Link>
              <div className="border-top pt-4 mt-4">
                <button className="btn btn-link text-secondary w-100 text-start">
                  Login
                </button>
                <button className="btn btn-primary w-100 text-start mt-2">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;