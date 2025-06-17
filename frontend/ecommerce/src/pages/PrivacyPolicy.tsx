import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-page">
      {/* Hero Section */}
      <section className="hero-section py-5" style={{background: 'linear-gradient(135deg, #f0f6ff 0%, #e0e7ff 100%)'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold mb-2">Privacy Policy</h1>
              <div className="mx-auto mb-4" style={{width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px'}}></div>
              <p className="lead text-secondary">
                Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-lg-5">
                  <article>
                    <section className="mb-5">
                      <h2 className="h3 mb-4">1. Information Collection</h2>
                      <p className="text-secondary mb-4">
                        We collect several types of information from and about users of our website, including:
                      </p>
                      <ul className="text-secondary">
                        <li className="mb-2">Personal information (name, email address, phone number)</li>
                        <li className="mb-2">Payment information (credit card details, billing address)</li>
                        <li className="mb-2">Shopping preferences and history</li>
                        <li className="mb-2">Device and browser information</li>
                        <li className="mb-2">Location data</li>
                      </ul>
                    </section>

                    <section className="mb-5">
                      <h2 className="h3 mb-4">2. Use of Information</h2>
                      <p className="text-secondary mb-4">
                        The information we collect is used for:
                      </p>
                      <ul className="text-secondary">
                        <li className="mb-2">Processing your orders and payments</li>
                        <li className="mb-2">Providing customer support</li>
                        <li className="mb-2">Sending promotional communications (with your consent)</li>
                        <li className="mb-2">Improving our website and services</li>
                        <li className="mb-2">Preventing fraud and maintaining security</li>
                      </ul>
                    </section>

                    <section className="mb-5">
                      <h2 className="h3 mb-4">3. Data Protection</h2>
                      <p className="text-secondary mb-4">
                        We implement appropriate data collection, storage, and processing practices and
                        security measures to protect against unauthorized access, alteration, disclosure,
                        or destruction of your personal information.
                      </p>
                    </section>

                    <section className="mb-5">
                      <h2 className="h3 mb-4">4. Third-Party Services</h2>
                      <p className="text-secondary mb-4">
                        We may employ third-party companies and individuals to:
                      </p>
                      <ul className="text-secondary">
                        <li className="mb-2">Process payments</li>
                        <li className="mb-2">Provide analytics services</li>
                        <li className="mb-2">Host our website</li>
                        <li className="mb-2">Send newsletters</li>
                      </ul>
                    </section>

                    <section className="mb-5">
                      <h2 className="h3 mb-4">5. Your Rights</h2>
                      <p className="text-secondary mb-4">
                        You have the right to:
                      </p>
                      <ul className="text-secondary">
                        <li className="mb-2">Access your personal data</li>
                        <li className="mb-2">Correct inaccurate data</li>
                        <li className="mb-2">Request deletion of your data</li>
                        <li className="mb-2">Object to data processing</li>
                        <li className="mb-2">Data portability</li>
                      </ul>
                    </section>

                    <section className="mb-5">
                      <h2 className="h3 mb-4">6. Contact Us</h2>
                      <p className="text-secondary">
                        If you have any questions about this Privacy Policy, please contact us at:
                      </p>
                      <ul className="text-secondary">
                        <li>Email: privacy@shophub.com</li>
                        <li>Phone: (800) 123-4567</li>
                        <li>Address: 123 Shopping Street, New York, NY 10001</li>
                      </ul>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 