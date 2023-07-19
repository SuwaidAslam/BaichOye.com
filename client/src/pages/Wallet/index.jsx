import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Pagination } from 'react-bootstrap';
import './wallet.css'; // Import the custom CSS file
import { getTransactions, getWalletBalance, depositMoney, withdrawMoney } from '../../redux/wallet/walletSlice';
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns';
import { Button, Modal, Form } from 'react-bootstrap';



const Wallet = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const { transactions, balance, depositedAmount, withdrawnAmount } = useSelector((selector) => selector.wallet);
    const currectUser = useSelector((selector) => selector.auth.user);
    const chartData = [
        { title: 'Deposit Amount', value: depositedAmount, color: '#0d6efd' },
        { title: 'Withdrawal Amount', value: withdrawnAmount, color: '#dc3545' },
    ];
    const handleOpenModal = (type) => {
        setShowModal(true);
        setTransactionType(type);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAmount('');
        setTransactionType('');
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDeposit = () => {
        handleOpenModal('deposit');
    };

    const handleWithdraw = () => {
        handleOpenModal('withdraw');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform deposit or withdrawal logic here
        if (transactionType === 'deposit') {
            dispatch(depositMoney(amount));
        }
        else {
            dispatch(withdrawMoney(amount));
        }
        handleCloseModal();
    };

    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;
    useEffect(() => {
        dispatch(getTransactions());
        dispatch(getWalletBalance())
    }, [dispatch]);

    // Logic to calculate pagination
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderTransactions = () => {
        if (transactions) {
            return currentTransactions.map((transaction) => (
                <tr key={transaction._id} style={{ backgroundColor: transaction.buyerId._id === currectUser._id ? '#ffa6a6' : '#a6ffbf' }}>
                    <td>{format(new Date(transaction.createdAt), 'yyyy-MM-dd')}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.adId ? transaction.adId.title : ''}</td>
                    <td>Rs-{transaction.amount}</td>
                </tr>
            ));
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Wallet</h2>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12 mb-4">
                                            <h4>Total Balance: Rs {balance}</h4>
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="deposit-amount">Deposits</p>
                                            <h4>Rs {depositedAmount}</h4>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="withdrawal-amount">Withdrawals</p>
                                            <h4>Rs {withdrawnAmount}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="chart-container">
                                        <PieChart
                                            data={chartData}
                                            lineWidth={20}
                                            radius={50}
                                            label={({ dataEntry }) => `Rs ${dataEntry.value}`}
                                            labelStyle={{
                                                fontSize: '8px',
                                                fontFamily: 'sans-serif',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-start">
                                        <button className="btn btn-primary me-md-2" type="button" onClick={handleDeposit}>
                                            Deposit
                                        </button>
                                        <button className="btn btn-danger" type="button" onClick={handleWithdraw}>
                                            Withdraw
                                        </button>
                                        <Modal show={showModal} onHide={handleCloseModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={handleSubmit}>
                                                    <Form.Group controlId="amount">
                                                        <Form.Label>Amount</Form.Label>
                                                        <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={handleAmountChange} />
                                                    </Form.Group>
                                                    <div className="text-center mt-3">
                                                        <Button variant="primary" type="submit">
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Transaction History */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Transaction History</h2>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Ad</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderTransactions()}</tbody>
                                </table>
                            </div>
                            {transactions.length > transactionsPerPage && (
                                <div className="d-flex justify-content-center mt-3">
                                    <Pagination>
                                        {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, index) => (
                                            <Pagination.Item
                                                key={index + 1}
                                                active={index + 1 === currentPage}
                                                onClick={() => handlePaginationClick(index + 1)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                    </Pagination>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
