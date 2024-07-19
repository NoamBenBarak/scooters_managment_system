import { Request, Response } from 'express';
import { findUserByEmail } from './userController';
import bcrypt from 'bcrypt';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found in the system' });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful',  user});
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

