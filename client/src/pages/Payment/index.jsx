import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './PaymentPage.css';
import toast from 'react-hot-toast'
import { makeTransaction, makeTransactionFromWallet } from '../../redux/wallet/walletSlice';
import { useDispatch, useSelector } from 'react-redux'

const PaymentPage = () => {
  const dispatch = useDispatch()
  const { state: { userId, ad } } = useLocation()
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');


  const { balance, errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.wallet); 

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage)
    }
    if (isSuccess && successMessage) {
      toast.success(successMessage)
    }
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])

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
    const current_user = JSON.parse(localStorage.getItem('user'))
    const current_user_id = current_user._id
    const data = {
      sellerId: userId,
      buyerId: current_user_id,
      adId: ad._id,
      amount: ad.price
    }
    //check if the payment method is selected
    if (paymentMethod !== '') {
      // if the payment method is not wallet, check if the card number is entered
      if (paymentMethod !== 'wallet') {
        // if card number is entered, check if the expiry date is entered
        if (cardNumber !== '' && expiryDate !== '' && cvv !== '') {
          dispatch(makeTransaction(data))
          toast.success('Payment Successful');
        }
      }
      else {
        dispatch(makeTransactionFromWallet(data))
      }
    }
    else {
      toast.error('Please select a payment method');
    }
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
                    <p className="payment-wallet-balance">Wallet Balance: Pkr {balance}</p>
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
