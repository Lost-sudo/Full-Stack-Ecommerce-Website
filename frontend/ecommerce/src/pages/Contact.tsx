// NOTE: If you do not see the social media icons, install Bootstrap Icons:
// npm install bootstrap-icons

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/icons.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section py-5 min-vh-50 d-flex align-items-center" style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold mb-2">Contact Us</h1>
              <div className="mx-auto mb-4" style={{width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px'}}></div>
              <p className="lead text-secondary">
                Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section py-5 bg-white">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3 mx-auto">
                    <i className="bi bi-geo-alt text-primary" style={{fontSize: '2rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Visit Us</h3>
                  <p className="text-secondary mb-0">
                    123 Shopping Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3 mx-auto">
                    <i className="bi bi-telephone text-primary" style={{fontSize: '2rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Call Us</h3>
                  <p className="text-secondary mb-0">
                    Toll-free: (800) 123-4567<br />
                    Fax: (800) 123-4568<br />
                    Mon-Fri 9am-6pm EST
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-circle mb-3 mx-auto">
                    <i className="bi bi-envelope text-primary" style={{fontSize: '2rem'}}></i>
                  </div>
                  <h3 className="h4 mb-3">Email Us</h3>
                  <p className="text-secondary mb-0">
                    General: info@shophub.com<br />
                    Support: help@shophub.com<br />
                    Press: media@shophub.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0" style={{borderRadius: '1.5rem'}}>
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Your Message</label>
                      <textarea
                        className="form-control form-control-lg"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="text-center mt-5">
                <h3 className="h4 mb-4">Connect With Us</h3>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://facebook.com/shophub" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                    <i className="bi bi-facebook fs-4"></i>
                  </a>
                  <a href="https://twitter.com/shophub" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                    <i className="bi bi-twitter fs-4"></i>
                  </a>
                  <a href="https://instagram.com/shophub" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                    <i className="bi bi-instagram fs-4"></i>
                  </a>
                  <a href="https://linkedin.com/company/shophub" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                    <i className="bi bi-linkedin fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 