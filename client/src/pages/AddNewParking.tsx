import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import MyMap from '../components/LocationMap'; 
import axios from 'axios';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatName } from '../functions';

interface Address {
  city: string;
  street: string;
  number: number;
}

const AddParkingForm: React.FC = () => {
  const [address, setAddress] = useState<Address>({ city: 'Tel-Aviv', street: '', number: 0 });
  const [capacity, setCapacity] = useState<number>(0);
  const [polygon, setPolygon] = useState<GeoJSON.Feature<GeoJSON.Polygon> | null>(null);
  const { isLoggedIn } = useAuth(); 
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const URL =process.env.REACT_APP_API_URL
  useEffect(()=>{console.log(URL);
  },[URL])

  const apiUrl = URL || 'http://localhost:5000';

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/');
      alert('You must be logged in to add a parking spot.');
    }
  }, [isLoggedIn, navigate]);

  const handlePolygonData = (polygonData: GeoJSON.Feature<GeoJSON.Polygon>) => {
    setPolygon(polygonData); 
  };

  const validateForm = (): string =>{
    if (address.number <= 0) {
      return"Address number must be greater than 0.";
    }
    if (address.street.length < 3) {
      return "Street name must be at least 3 characters long.";
    }
    const englishOnlyRegex = /^[A-Za-z\s]+$/;
    if (!englishOnlyRegex.test(address.street)) {
       return "Street name must contain only English letters.";
    }
    return ""
  }
  

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedStreet = formatName(event.target.value);
    setAddress({ ...address, street: formattedStreet });
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError!=="") {
      setErrorMessage(validationError);
      return;
    }
    else if (validationError=="") {
      if (!polygon) {
        setErrorMessage("Please select a location on the map.");
        return;
      }

      const parkingData = {
        address,
        capacity,
        currentParking: 0, 
        location: {
          type: 'Polygon',
          coordinates: polygon.geometry.coordinates
        },
      }
    try {
      const response = await axios.post(`${apiUrl}/parkings`, parkingData);
      if (response.status === 201) {
        setSuccessMessage("Parking spot added successfully!");
        setErrorMessage("");
        setSuccessMessage("");
        setAddress({ city: 'Tel-Aviv', street: '', number: 0 });
        setCapacity(0);
        setPolygon(null);
        setTimeout(() => {
          navigate('/parkings/spots');
        }, 1000);
      }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message || "An error occurred during registration.");
        } else {
          setErrorMessage("An unknown error occurred.");
        }
        setSuccessMessage("");
      }
    };
  };

  return (
    <>
      <Header title='Add New Parking' headline='Always nice to add new parking' />
      <Container>
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              id="city"
              value={address.city}
              readOnly
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="street">Street</Label>
            <Input
              type="text"
              id="street"
              value={address.street}
               onChange={handleStreetChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="number">Number</Label>
            <Input
              type="number"
              id="number"
              value={address.number}
              onChange={(e) => setAddress({ ...address, number: +e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacity">Capacity</Label>
            <Input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(+e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <MyMap onPolygonCreate={handlePolygonData} />
          </FormGroup>
          <div className="text-center mb-3">
            <Button color="primary" block type="submit" className="btn-lg mb-5">Add Parking Spot</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddParkingForm;
