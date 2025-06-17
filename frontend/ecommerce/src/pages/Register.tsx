import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from '../components/modals/TermsModal';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear password error when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Account created successfully!');
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center" 
         style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg" style={{borderRadius: '1.5rem'}}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Create Account</h1>
                  <p className="text-secondary mb-0">Join ShopHub and start shopping today</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-person text-secondary"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg border-start-0 ps-0"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-secondary"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-lg border-start-0 ps-0"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-secondary"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0 ps-0"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="form-text text-secondary mt-2">
                      <small>Password must be at least 8 characters long</small>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock-fill text-secondary"></i>
                      </span>
                      <input
                        type="password"
                        className={`form-control form-control-lg border-start-0 ps-0 ${passwordError ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        minLength={8}
                      />
                      {passwordError && (
                        <div className="invalid-feedback">
                          {passwordError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                      <label className="form-check-label text-secondary" htmlFor="agreeTerms">
                        I agree to the{' '}
                        <button 
                          type="button" 
                          className="btn btn-link text-primary p-0 text-decoration-none" 
                          onClick={() => setShowTermsModal(true)}
                        >
                          Terms of Service
                        </button>
                        {' '}and{' '}
                        <Link to="/privacy-policy" className="text-primary text-decoration-none">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">
                    Create Account
                  </button>

                  <div className="text-center">
                    <p className="text-secondary mb-0">
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary text-decoration-none">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Social Register Options */}
            <div className="text-center mt-4">
              <p className="text-secondary mb-3">Or register with</p>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-secondary btn-lg rounded-circle" style={{width: '48px', height: '48px'}}>
                  <i className="bi bi-google"></i>
                </button>
                <button className="btn btn-outline-secondary btn-lg rounded-circle" style={{width: '48px', height: '48px'}}>
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="btn btn-outline-secondary btn-lg rounded-circle" style={{width: '48px', height: '48px'}}>
                  <i className="bi bi-apple"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <TermsModal show={showTermsModal} onHide={() => setShowTermsModal(false)} />
    </div>
  );
};

export default Register; 