import { Request, Response } from 'express';
import Failure from '../models/Failure';


// Create a new failure
export const createNewFailure = async (req: Request, res: Response) => {
    try {
        const { type, status, openingTime, closingTime, scooterId } = req.body;
        const newFailure = new Failure({
            type, 
            status, 
            openingTime, 
            closingTime: closingTime ? closingTime : null,
            scooterId
        });
        const savedFailure = await newFailure.save();
        res.status(201).json(savedFailure);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create failure' });
    }
};

// Get active failures by scooterId
export const getActiveFailuresByScooterId = async (req: Request, res: Response) => {
    try {
        const { scooterId } = req.params;
        const failures = await Failure.find({ scooterId, status: 'open' });
        res.json(failures);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve active failures' });
    }
};

// Get failure history by scooterId
export const getFailureHistoryByScooterId = async (req: Request, res: Response) => {
    try {
        const { scooterId } = req.params;
        const failures = await Failure.find({ scooterId }).sort({ openingTime: 1 });
        res.json(failures);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve failure history' });
    }
};

// Get all failures
export const getAllFailures = async (req: Request, res: Response) => {
    try {
        const failures = await Failure.find();
        res.json(failures);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all failures' });
    }
};

// Get a specific failure by ID
export const getFailureById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const failure = await Failure.findById(id);
        if (!failure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json(failure);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve failure' });
    }
};

// Update a failure by ID
export const updateFailureById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type, status, openingTime, closingTime, scooterId } = req.body;
        
        const updatedFailure = await Failure.findByIdAndUpdate(id, {
            type, 
            status, 
            openingTime, 
            closingTime: closingTime ? closingTime : null,
            scooterId
        }, { new: true });
        
        if (!updatedFailure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json(updatedFailure);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update failure' });
    }
};

// Delete a failure by ID
export const deleteFailureById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedFailure = await Failure.findByIdAndDelete(id);
        if (!deletedFailure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json({ message: 'Failure deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete failure' });
    }
};
