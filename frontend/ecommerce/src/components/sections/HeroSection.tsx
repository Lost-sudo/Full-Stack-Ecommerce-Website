import React from 'react';

interface HeroSectionProps {
  // Add props here when needed
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="hero-section py-5 bg-light">
      <div className="container">
        <div className="text-center">
          <h1 className="display-4 fw-bold text-dark mb-4">
            Welcome to{' '}
            <span className="text-primary">ShopHub</span>
          </h1>
          <p className="lead text-secondary mb-4 mx-auto" style={{maxWidth: '700px'}}>
            Your ultimate destination for premium products and exceptional shopping experience. 
            Discover amazing deals and quality items all in one place.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
            <button className="btn btn-primary btn-lg fw-semibold shadow">
              Start Shopping
            </button>
            <button className="btn btn-outline-primary btn-lg fw-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;