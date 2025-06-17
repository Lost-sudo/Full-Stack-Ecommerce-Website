import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section py-5" style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="display-6 fw-bold mb-4">Ready to Start Shopping?</h2>
            <p className="lead text-secondary mb-4">Join thousands of satisfied customers who trust ShopHub for their shopping needs.</p>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-primary btn-lg fw-semibold shadow hover-lift"
              style={{
                transition: 'transform 0.2s',
                boxShadow: '0 4px 6px rgba(var(--bs-primary-rgb), 0.2)'
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 