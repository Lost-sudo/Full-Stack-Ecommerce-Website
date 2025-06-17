import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section py-5 min-vh-50 d-flex align-items-center" style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold mb-2">About ShopHub</h1>
              <div className="mx-auto mb-4" style={{width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px'}}></div>
              <p className="lead text-secondary">
                ShopHub is dedicated to providing a seamless, secure, and enjoyable shopping experience. Our mission is to connect you with quality products, trusted brands, and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-check text-primary" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Trust & Security</h3>
                  <p className="text-secondary mb-0">Your security is our priority. We ensure safe transactions and protect your personal information.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-star text-primary" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Quality First</h3>
                  <p className="text-secondary mb-0">We carefully curate our product selection to ensure you receive only the highest quality items.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-heart text-primary" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Customer Focus</h3>
                  <p className="text-secondary mb-0">Your satisfaction drives everything we do. We're here to support you every step of the way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-5" style={{background: '#f8faff'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="https://img.freepik.com/free-photo/modern-equipped-computer-store_23-2149141906.jpg" 
                alt="ShopHub Story" 
                className="img-fluid rounded-4 shadow" 
                style={{
                  objectFit: 'cover', 
                  height: '400px', 
                  width: '100%'
                }} 
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="text-secondary mb-4">
                Founded with a vision to revolutionize online shopping, ShopHub has grown from a small startup to a trusted e-commerce destination. Our journey began with a simple idea: make online shopping more personal, convenient, and enjoyable for everyone.
              </p>
              <p className="text-secondary mb-4">
                Today, we serve thousands of satisfied customers, offering a carefully curated selection of products from the world's leading brands. Our commitment to excellence and customer satisfaction remains at the heart of everything we do.
              </p>
              <div className="d-flex gap-4">
                <div>
                  <h3 className="h2 fw-bold text-primary mb-2">50K+</h3>
                  <p className="text-secondary mb-0">Happy Customers</p>
                </div>
                <div>
                  <h3 className="h2 fw-bold text-primary mb-2">1000+</h3>
                  <p className="text-secondary mb-0">Products</p>
                </div>
                <div>
                  <h3 className="h2 fw-bold text-primary mb-2">24/7</h3>
                  <p className="text-secondary mb-0">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 