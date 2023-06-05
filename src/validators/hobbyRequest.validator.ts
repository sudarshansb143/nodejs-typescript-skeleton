import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

// Request validator for creating a hobby
export const createHobbyValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object({
    passionLevel: Joi.string().valid('Low', 'Medium', 'High').required(),
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(9999).required(),
  });

  validateRequest(req, res, next, schema);
};

// Request validator for updating a hobby
export const updateHobbyValidator = (req: Request, res: Response, next: NextFunction) => {
  const schema: Schema = Joi.object({
    passionLevel: Joi.string().valid('Low', 'Medium', 'High').optional(),
    name: Joi.string().optional(),
    year: Joi.number().integer().min(1900).max(9999).optional(),
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