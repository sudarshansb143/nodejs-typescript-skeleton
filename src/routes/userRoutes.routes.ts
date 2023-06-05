import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from './../controllers';
import { createUserValidator, updateUserValidator } from './../validators'

const router = express.Router();

router.post('/', createUserValidator, createUser);
router.put('/:id', updateUserValidator, updateUserById);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);

export default router;