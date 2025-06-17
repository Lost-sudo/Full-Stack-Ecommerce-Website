import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PrivacyModalProps {
  show: boolean;
  onHide: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="privacy-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Privacy Policy Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="privacy-content">
          <div className="alert alert-info mb-4">
            <i className="bi bi-info-circle me-2"></i>
            This is a summary of our Privacy Policy. For the complete details, please visit our{' '}
            <Link to="/privacy-policy" onClick={onHide} className="alert-link">full Privacy Policy page</Link>.
          </div>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">Information We Collect</h4>
            <p className="text-secondary">
              We collect information you provide directly, including contact details, payment information,
              and shopping preferences.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">How We Use Your Information</h4>
            <p className="text-secondary">
              Your information helps us process orders, personalize your shopping experience,
              and communicate with you about our services.
            </p>
          </section>

          <section className="mb-4">
            <h4 className="h5 fw-bold mb-3">Data Protection</h4>
            <p className="text-secondary">
              We implement security measures to protect your personal information and ensure
              it's handled according to applicable data protection laws.
            </p>
          </section>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top">
        <Link to="/privacy-policy" onClick={onHide} className="btn btn-primary">
          View Full Policy
        </Link>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyModal; 