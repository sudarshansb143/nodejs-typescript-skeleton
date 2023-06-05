import { Request, Response } from 'express';
import { IHobby, HobbyModel } from './../models';

// Create a new hobby
export const createHobby = async (req: Request, res: Response) => {
    try {
        const { passionLevel, name, year } = req.body;
        const hobby: IHobby = new HobbyModel({ passionLevel, name, year });
        const newHobby = await hobby.save();
        res.status(201).json(newHobby);
    } catch (error) {
        console.log("erro", error)
        res.status(500).json({ error: 'Failed to create hobby' });
    }
};

// Get all hobbies
export const getHobbies = async (req: Request, res: Response) => {
    try {
        const hobbies = await HobbyModel.find();
        res.status(200).json(hobbies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hobbies' });
    }
};

// Get a single hobby by ID
export const getHobbyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const hobby = await HobbyModel.findById(id);
        if (!hobby) {
            return res.status(404).json({ error: 'Hobby not found' });
        }
        res.status(200).json(hobby);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hobby' });
    }
};

// Update a hobby by ID
export const updateHobbyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { passionLevel, name, year } = req.body;
        const updatedHobby = await HobbyModel.findByIdAndUpdate(
            id,
            { passionLevel, name, year },
            { new: true }
        );
        if (!updatedHobby) {
            return res.status(404).json({ error: 'Hobby not found' });
        }
        res.status(200).json(updatedHobby);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update hobby' });
    }
};

// Delete a hobby by ID
export const deleteHobbyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedHobby = await HobbyModel.findByIdAndDelete(id);
        if (!deletedHobby) {
            return res.status(404).json({ error: 'Hobby not found' });
        }
        res.status(200).json({ message: 'Hobby deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete hobby' });
    }
};
