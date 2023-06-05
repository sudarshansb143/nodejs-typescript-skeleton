import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

// Request validator for creating a user
export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object({
    name: Joi.string().required(),
    hobbies: Joi.array().items(Joi.string()).optional(),
  });

  validateRequest(req, res, next, schema);
};

// Request validator for updating a user
export const updateUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object({
    name: Joi.string().optional(),
    hobbies: Joi.array().items(Joi.string()).optional(),
  });

  validateRequest(req, res, next, schema);
};

// Generic function to validate the request
const validateRequest = (req: Request, res: Response, next: NextFunction, schema: Schema) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    res.status(400).json({ error: errorMessage });
  } else {
    next();
  }
};
