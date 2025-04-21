import React, { useState, useEffect } from 'react';
import './payment.css';
import qrImage from './img/qr.png'; // Make sure this path is correct

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    flat: '',
    issueDate: '',
    startDate: '',
    endDate: ''
  });

  const [showScanner, setShowScanner] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    const allFilled = Object.values(formData).every(value => value.trim() !== '');
    setIsFormComplete(allFilled);
  }, [formData]);

  useEffect(() => {
    let countdown;
    if (showScanner && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      setTimeout(() => {
        setShowScanner(false);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showScanner, timer]);

  const handlePaymentClick = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      setShowScanner(true);
      setTimer(30); // Reset timer
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="payment-container">
      <form className="payment-form">
        <h2 className="payment-heading">Maintenance Details</h2>

        <label className="payment-label">Name:</label>
        <input
          type="text"
          className="payment-input"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />

        <label className="payment-label">Flat no.:</label>
        <input
          type="text"
          className="payment-input"
          value={formData.flat}
          onChange={(e) => handleInputChange('flat', e.target.value)}
        />

        <label className="payment-label">Issue Date:</label>
        <input
          type="date"
          className="payment-input"
          value={formData.issueDate}
          onChange={(e) => handleInputChange('issueDate', e.target.value)}
        />

        <label className="payment-label">Period of Starting Date:</label>
        <input
          type="date"
          className="payment-input"
          value={formData.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        />

        <label className="payment-label">Period of Ending Date:</label>
        <input
          type="date"
          className="payment-input"
          value={formData.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
        />

        <div className="payment-button-container">
          <button
            className="primary-button"
            onClick={handlePaymentClick}
            disabled={!isFormComplete}
            style={{ opacity: isFormComplete ? 1 : 0.5, cursor: isFormComplete ? 'pointer' : 'not-allowed' }}
          >
            Payment
          </button>
          <button type="button" className="secondary-button">
            Download Maintenance PDF
          </button>
        </div>

        {showScanner && (
          <div className="qr-section">
            <img src={qrImage} alt="QR Code" className="qr-image" />
            <p className="timer-text">Time left: {timer}s</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Payment;

