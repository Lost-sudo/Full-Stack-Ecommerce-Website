import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div>
            <div className="d-flex align-items-center mb-3">
              <ShoppingBag className="me-2 text-primary" style={{width: '2rem', height: '2rem'}} />
              <span className="fs-4 fw-bold">ShopHub</span>
            </div>
            <p className="text-secondary">
              Your trusted partner for online shopping with quality products and exceptional service.
            </p>
          </div>
          
          <div>
            <h3 className="h5 fw-semibold mb-3">Quick Links</h3>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Home</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Products</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">About Us</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="h5 fw-semibold mb-3">Categories</h3>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Electronics</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Fashion</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Home & Garden</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Sports</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="h5 fw-semibold mb-3">Support</h3>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Help Center</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Shipping Info</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Returns</a></li>
              <li><a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-top mt-4 pt-4 text-center">
          <p className="text-secondary">
            © 2024 ShopHub. All rights reserved. Built with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 