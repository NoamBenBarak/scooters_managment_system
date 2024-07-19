import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface IParking {
    address: { city: string; street: string; number: number };
    capacity: number;
    currentParking: number;
    location: { type: 'Polygon'; coordinates: number[][][] };
}

const ParkingSpotsPage: React.FC = () => {
    const navigate = useNavigate();
    const [parkings, setParkings] = useState<IParking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { isLoggedIn } = useAuth(); 
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); 
            alert('You must be logged in to add a parking spot.');
        }
        const fetchParkings = async () => {
            try {
                const response = await axios.get<IParking[]>(`${apiUrl}/parkings`);
                setParkings(response.data);
            } catch (error) {
                console.error('Error fetching parking spots:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchParkings();
    }, [isLoggedIn]); 

    const handleAddNewParking = () => {
        navigate('/parkings/new'); 
    };

    return (
        <>
            <Header title="Existing parking spots" headline="You can always add a new parking spot" />
            <Container>
                <Row>
                    <Col>
                        <h2 className="my-4 text-center">Existing Parking Spots</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Street</th>
                                        <th>Number</th>
                                        <th>Capacity</th>
                                        <th>Current Parking</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parkings.map((parking, index) => (
                                        <tr key={index}>
                                            <td>{parking.address.city}</td>
                                            <td>{parking.address.street}</td>
                                            <td>{parking.address.number}</td>
                                            <td>{parking.capacity}</td>
                                            <td>{parking.currentParking}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
                {isLoggedIn && (
                    <Row>
                        <Button color="success" block className="btn-lg" onClick={handleAddNewParking}>
                            Add a new PARKING Spot
                        </Button>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default ParkingSpotsPage;
