import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  // Add props here when needed
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section py-5 min-vh-75 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'
    }}>
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
            <button 
              onClick={() => navigate('/products')}
              className="btn btn-primary btn-lg fw-semibold px-4 py-2 rounded-pill hover-lift"
              style={{
                transition: 'transform 0.2s',
                boxShadow: '0 4px 6px rgba(var(--bs-primary-rgb), 0.2)'
              }}
            >
              Start Shopping <i className="bi bi-arrow-right ms-2"></i>
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="btn btn-outline-primary btn-lg fw-semibold px-4 py-2 rounded-pill hover-lift"
              style={{
                transition: 'transform 0.2s'
              }}
            >
              Learn More <i className="bi bi-info-circle ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;