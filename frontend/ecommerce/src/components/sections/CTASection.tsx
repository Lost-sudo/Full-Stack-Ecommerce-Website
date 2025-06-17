import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section py-5 bg-white">
      <div className="container text-center">
        <h2 className="display-5 fw-bold text-dark mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="lead text-secondary mb-4">
          Join thousands of satisfied customers and discover amazing products at unbeatable prices.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
          <button className="btn btn-primary btn-lg fw-semibold shadow">
            Create Account
          </button>
          <button className="btn btn-outline-primary btn-lg fw-semibold">
            Browse Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 