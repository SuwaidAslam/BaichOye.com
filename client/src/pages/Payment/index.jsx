import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePaymentMethodChange = (event) => {    
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission logic here
  };

  return (
    <div className="payment-container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Payment</h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="form-select"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="wallet">Wallet</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>
                </div>
                {paymentMethod === 'wallet' && (
                  <div className="mb-3">
                    <p className="payment-wallet-balance">Wallet Balance: $500</p>
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="form-control"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="expiryDate" className="form-label">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="form-control"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="form-control"
                          value={cvv}
                          onChange={handleCVVChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
