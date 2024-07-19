import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
    const { setLoggedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(email, password);
            const response = await axios.post(`${apiUrl}/auth`, {
                email,
                password
            });
            if (response.status === 200) {
                setLoggedIn(true); 
                navigate('/parkings/spots')
            }
            else if(response.status===400){
                setErrorMessage("Invalid email or password")
            }
        } catch (error) {
            console.log(error);
        }
        setEmail('');
        setPassword('');
    };
    

    return(
        <>
        <Header title="Login To The System" headline='Best Scooters!'/>
        <Container className="mt-5">
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <Row>
            <Col md={{ size: 6, offset: 3 }}>
                <h2 className="text-center mb-4">User Details</h2>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label for="useremail">Email</Label>
                        <Input
                            type="text"
                            name="useremail"
                            id="useremail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </FormGroup>
                    <Button color="primary" block type="submit" className="btn btn-primary">
                        Login
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    </>
    )
} 

export default LoginPage