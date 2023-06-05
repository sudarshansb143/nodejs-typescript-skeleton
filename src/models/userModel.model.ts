import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  name: string;
  hobbies: mongoose.Types.ObjectId[];
}

// Define the schema for the User collection
 const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
});

// Create the User model
export const UserModel = mongoose.model<IUser>('User', UserSchema);

