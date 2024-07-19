import { Request, Response } from 'express';
import Parking, { IParking } from '../models/Parking';


// Get all parking spots
export const getAllParkingSpots = async (req: Request, res: Response) => {
    try {
        const parkingSpots = await Parking.find();
        res.json(parkingSpots);
    } catch (error) {
        console.error('Error fetching parking spots:', error);
        res.status(500).json({ error: 'Failed to retrieve parking spots' });
    }
};

// Create a new parking spot
export const createNewParkingSpot = async (req: Request, res: Response) => {
    try {
        const {address, location, capacity, currentParking  } = req.body;
        
        const newParking = new Parking({
            address,
            location,
            capacity,
            currentParking  
        });
        
        const savedParking = await newParking.save();
        res.status(201).json(savedParking);

    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create new parking spot' });
    }
};


// Get parking availability
export const getParkingAvailability = async (req: Request, res: Response) => {
    try {
        const parkingSpots = await Parking.find();
        const parkingData = parkingSpots.map((spot: IParking) => ({
            address: spot.address, 
            availableSpaces: spot.capacity - spot.currentParking 
        }));
        res.json(parkingData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all the available parkings' });
    }
};


// Get a parking spot by ID
export const getParkingSpotById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parkingSpot = await Parking.findById(id);
        if (!parkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json(parkingSpot);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve parking spot' });
    }
};

// Update a parking spot by ID
export const updateParkingSpotById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { address, location, capacity, currentParking } = req.body;

        const updatedParkingSpot = await Parking.findByIdAndUpdate(id, {
            address,
            location,
            capacity,
            currentParking
        }, { new: true });

        if (!updatedParkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json(updatedParkingSpot);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update parking spot' });
    }
};

// Delete a parking spot by ID
export const deleteParkingSpotById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedParkingSpot = await Parking.findByIdAndDelete(id);
        if (!deletedParkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json({ message: 'Parking spot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete parking spot' });
    }
};
