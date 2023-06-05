import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Hobby document
export interface IHobby extends Document {
    passionLevel: string;
    name: string;
    year: number;
}

// Define the schema for the Hobby collection
const HobbySchema: Schema = new Schema({
    passionLevel: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
});

// Create the Hobby model
export const HobbyModel = mongoose.model<IHobby>('Hobby', HobbySchema);
