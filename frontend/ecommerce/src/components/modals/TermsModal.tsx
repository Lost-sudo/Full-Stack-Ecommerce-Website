import React from 'react';
import { Modal } from 'react-bootstrap';

interface TermsModalProps {
  show: boolean;
  onHide: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="terms-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Terms of Service</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="terms-content">
          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">1. Acceptance of Terms</h4>
            <p className="text-secondary">
              By accessing and using ShopHub's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">2. User Accounts</h4>
            <p className="text-secondary">
              You must provide accurate and complete information when creating an account.
              You are responsible for maintaining the security of your account and password.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">3. Shopping and Transactions</h4>
            <p className="text-secondary">
              All purchases are subject to product availability. We reserve the right to limit quantities
              and refuse service to anyone.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">4. Privacy and Data Protection</h4>
            <p className="text-secondary">
              Your use of our services is also governed by our Privacy Policy. Please review our full
              Privacy Policy for more information about how we collect and use your data.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">5. Intellectual Property</h4>
            <p className="text-secondary">
              All content on ShopHub, including text, graphics, logos, and software, is protected
              by intellectual property rights and remains our property.
            </p>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top">
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
        <button className="btn btn-primary" onClick={onHide}>
          I Understand
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal; 