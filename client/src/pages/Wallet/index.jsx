import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Pagination } from 'react-bootstrap';
import './wallet.css'; // Import the custom CSS file

const Wallet = () => {
    const chartData = [
        { title: 'Refund Amount', value: 50, color: '#ff6384' },
        { title: 'Deposit Amount', value: 200, color: '#36a2eb' },
        { title: 'Withdrawal Amount', value: 100, color: '#ffce56' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;
    const transactions = [
        {
            id: 1,
            date: '2023-05-01',
            adId: 'Transaction 1',
            status: 'Pending',
            amount: 100,
        },
        {
            id: 2,
            date: '2023-05-02',
            adId: 'Transaction 2',
            status: 'Pending',
            amount: -50,
        },
        {
            id: 3,
            date: '2023-05-02',
            adId: 'Transaction 111',
            status: 'Pending',
            amount: -50,
        },
        {
            id: 4,
            date: '2023-05-02',
            adId: 'Transaction 111',
            status: 'Pending',
            amount: -50,
        },
        {
            id: 5,
            date: '2023-05-02',
            adId: 'Transaction 111',
            status: 'Approved',
            amount: -50,
        },
        {
            id: 6,
            date: '2023-05-02',
            adId: 'Transaction 111',
            status: 'Approved',
            amount: -50,
        },
        // Add more dummy transactions here...
    ];

    // Logic to calculate pagination
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderTransactions = () => {
        return currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.status}</td>
                <td>{transaction.adId}</td>
                <td>{transaction.amount}</td>
            </tr>
        ));
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
                                            <h4>Total Balance: $500</h4>
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p className="refund-amount">Refunds</p>
                                            <h4>$50</h4>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="deposit-amount">Deposits</p>
                                            <h4>$200</h4>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="withdrawal-amount">Withdrawals</p>
                                            <h4>$100</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="chart-container">
                                        <PieChart
                                            data={chartData}
                                            lineWidth={20}
                                            radius={50}
                                            label={({ dataEntry }) => `$${dataEntry.value}`}
                                            labelStyle={{
                                                fontSize: '10px',
                                                fontFamily: 'sans-serif',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-start">
                                        <button className="btn btn-primary me-md-2" type="button">
                                            Deposit
                                        </button>
                                        <button className="btn btn-danger" type="button">
                                            Withdraw
                                        </button>
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
