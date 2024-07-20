import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import bcrypt from 'bcryptjs';

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const { setLoggedIn } = useAuth();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const apiUrl = "https://scooters-managment-system-26.onrender.com"  || 'http://localhost:5000';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();


    const validateForm = (): string => {
        const { userName, firstName, lastName } = formData;
        if (/\s/.test(userName)) {
            return "Username should not contain spaces.";
        }
        if (firstName.length < 3) {
            return "First name must be at least 3 characters long.";
        }
        if (lastName.length < 3) {
            return "Last name must be at least 3 characters long.";
        }
        return "";
    };


    const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError=="") {
            setErrorMessage(validationError);
            return;
        }
        try {
             // Hash the password before sending it to the server
            // const hashedPassword = await bcrypt.hash(formData.password, 10);
            // const dataToSend = { ...formData, password: hashedPassword };
            const response = await axios.post(`${apiUrl}/users`, formData);
            if (response.status === 201) {
                setFormData({
                    email: '',
                    userName: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                });
                setSuccessMessage("User registered successfully!");
                setErrorMessage("");
                setLoggedIn(true); // Update context
                setTimeout(() => {
                    navigate('/parkings/spots');
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || "An error occurred during registration.");
                setSuccessMessage("");
            } else {
                setErrorMessage("An unknown error occurred.");
                setSuccessMessage("");
            }
        }
    };

    return (
        <>
            <Header title="Register For The System" headline='Sign up to manage your fleet of scooters!' />
            <Container className="mt-5">
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                {successMessage && <Alert color="success">{successMessage}</Alert>}
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <h2 className="text-center mb-4">User Details</h2>
                        <Form onSubmit={handleRegistration}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userName">User Name</Label>
                                <Input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <Button color="primary" block type="submit" className="btn-lg">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RegistrationPage;
