import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClicked = () => {
        navigate('/login');
    };
    
    const handleRegistrationClicked = () => {
        navigate('/registration')
    };
    

    return(
        <Container fluid className='p-0'>
            <Header
                title = "Scooter Application"
                headline="The best management system for managing a fleet of scooters"
            />
            <Container className='mt-5'>
            <Row>
                <Col>
                    <Button color="primary" block className="btn-lg" onClick={handleLoginClicked}>Login</Button>
                </Col>
                <Col>
                    <Button color="success" block className="btn-lg" onClick={handleRegistrationClicked}>Registration</Button>
                </Col>
            </Row>
            </Container>
        </Container>
    )
} 

export default HomePage