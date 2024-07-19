import { Request, Response } from 'express';
import User from '../models/User';


// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, firstName, lastName } = req.body;
        if (!userName || !password || !firstName || !lastName || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const newUser = new User({
            userName,
            password,
            firstName,
            lastName,
            email
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get a user by Email
export const findUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
};


// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userName, email, password, firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, {
            userName,
            email,
            password,
            firstName,
            lastName
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};