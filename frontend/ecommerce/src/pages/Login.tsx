import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from '../components/modals/TermsModal';

const Login: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center" 
         style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg" style={{borderRadius: '1.5rem'}}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Welcome Back</h1>
                  <p className="text-secondary mb-0">Please sign in to continue</p>
                </div>

                <form>
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
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label htmlFor="password" className="form-label mb-0">Password</label>
                      <Link to="/forgot-password" className="text-primary text-decoration-none small">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-secondary"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0 ps-0"
                        id="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" />
                      <label className="form-check-label text-secondary" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">
                    Sign In
                  </button>

                  <div className="text-center">
                    <p className="text-secondary mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary text-decoration-none">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="text-center mt-4">
              <p className="text-secondary mb-3">Or continue with</p>
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

            {/* Terms and Privacy Links */}
            <div className="text-center mt-4">
              <p className="text-secondary small">
                By signing in, you agree to our{' '}
                <button 
                  type="button" 
                  className="btn btn-link text-primary p-0 text-decoration-none small" 
                  onClick={() => setShowTermsModal(true)}
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <Link to="/privacy-policy" className="text-primary text-decoration-none small">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <TermsModal show={showTermsModal} onHide={() => setShowTermsModal(false)} />
    </div>
  );
};

export default Login; 