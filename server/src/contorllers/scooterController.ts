import { Request, Response } from 'express';
import Scooter from '../models/Scooter';


// Get all scooters
export const getAllScooters = async (req: Request, res: Response) => {
    try {
        const scooters = await Scooter.find();
        res.json(scooters);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Create a new scooter
export const createScooter = async (req: Request, res: Response) => {
    try {
        const { uniqueId, location, model, year, status } = req.body;

        // Check for required fields
        if (!uniqueId || !location || !model || !year || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newScooter = new Scooter({
            uniqueId,
            location,
            model,
            year,
            status
        });

        const savedScooter = await newScooter.save();
        res.status(201).json(savedScooter);

    } catch (error) {
        console.error('Error creating scooter:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Filter scooters by polygon
export const filterScootersByPolygon = async (req: Request, res: Response) => {
    try {
        const { polygon } = req.body;
        if (!polygon) {
            return res.status(400).json({ error: 'Polygon is required' });
        }
        const scooters = await Scooter.find({
            location: {
                $geoWithin: {
                    $geometry: polygon,
                },
            },
        });
        res.json(scooters);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Filter available scooters
export const filterAvailableScooters = async (req: Request, res: Response) => {
    try {
        const scooters = await Scooter.find({ status: 'active'});
        res.json(scooters);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Update a scooter by ID
export const updateScooter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const scooter = await Scooter.findByIdAndUpdate(id, req.body, { new: true });
        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found' });
        }
        res.json(scooter);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a scooter by ID
export const deleteScooter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const scooter = await Scooter.findByIdAndDelete(id);
        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found' });
        }
        res.json({ message: 'Scooter deleted' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};




