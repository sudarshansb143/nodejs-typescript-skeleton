import { Request, Response } from 'express';
import { IUser, UserModel } from './../models';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, hobbies } = req.body;
        const user: IUser = new UserModel({ name, hobbies });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find().populate('hobbies');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).populate('hobbies');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, hobbies } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { name, hobbies },
            { new: true }
        ).populate('hobbies');
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
