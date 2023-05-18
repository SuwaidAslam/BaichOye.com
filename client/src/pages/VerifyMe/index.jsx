import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiUpload } from 'react-icons/fi';
import './VerifyMe.css';
import { useDispatch, useSelector } from 'react-redux'
import { submitVerificationData, reset } from '../../redux/auth/authSlice'

const VerifyMe = () => {
    const dispatch = useDispatch()
    const [issuingCountry, setIssuingCountry] = useState('');
    const [idType, setIdType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCountryChange = (e) => {
        setIssuingCountry(e.target.value);
    };

    const handleIdTypeChange = (e) => {
        setIdType(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
          // Create form data object
          const formData = new FormData();
          formData.append('issuingCountry', issuingCountry);
          formData.append('idType', idType);
          formData.append('idImage', selectedFile);
          dispatch(submitVerificationData(formData))
    };

    return (
        <div className="verify-container">
            <Card className="verify-card">
                <Card.Body>
                    <Card.Title className="text-center">ID Card Verification</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="issuingCountry">
                            <Form.Label className='form-label'>Issuing Country</Form.Label>
                            <Form.Control
                                as="select"
                                value={issuingCountry}
                                onChange={handleCountryChange}
                            >
                                <option value="">Select Country</option>
                                <option value="Pakistan">Pakistan</option>
                                {/* <option value="UK">UK</option>
                                <option value="UK">USA</option>
                                <option value="UK">Australia</option>
                                <option value="Canada">Canada</option> */}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="idType">
                            <Form.Label className='form-label'>ID Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={idType}
                                onChange={handleIdTypeChange}
                            >
                                <option value="">Select ID Type</option>
                                <option value="CNIC">CNIC</option>
                                <option value="DriverLicense">Driver's License</option>
                                <option value="Passport">Passport</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="idImage">
                            <Form.Label className='form-label'>Upload ID Image</Form.Label>
                            <div className="upload-input-wrapper">
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="upload-input"
                                    onChange={handleFileChange}
                                />
                                <FiUpload className="upload-icon" />
                            </div>
                        </Form.Group>
                        {selectedFile && (
                            <div className="uploaded-image-wrapper">
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Uploaded ID"
                                    className="uploaded-image"
                                />
                            </div>
                        )}

                        {!selectedFile && (
                            <div className="instructions">
                                <ul>
                                    <li>Upload a color image of the ID card</li>
                                    <li>Upload a clear image of the ID card</li>
                                    <li>Maximum file size: 5 MB</li>
                                </ul>
                            </div>
                        )}

                        <div className="text-center submit-button">
                            <Button variant="primary" type="submit">
                                Start Verification
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default VerifyMe;
